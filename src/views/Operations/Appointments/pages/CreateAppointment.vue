<template>
  <div>
    <PageHeader :schema="$schemas.appointment" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly :title="l.appointmentData.title" multiple :icon="$icons.list">
        <AppointmentData v-bind="appointmentDataProps" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly :title="l.items.title" class="mt-3" multiple :icon="$icons.list">
        <Items v-bind="ItemsProps" @handleAction="handleAction"/>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly :title="l.totalizers.title" class="mt-3" multiple :icon="$icons.list">
        <Totalizers />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly :title="l.actions.title" class="mt-3" multiple :icon="$icons.list">
        <Button :label="l.actions.save" color="primary" rounded :icon="$icons.save" :disabled="appointmentFinished" @click="save()" />
      </ExpansionPanel>

      <Dialog no-title no-actions :dialog="dialog"  :maxWidth="parseInt(1100)">
        <DialogAddItem slot="content" v-bind="dialogProps" @update:dialog="dialog = $event" @handleActionModal="handleActionModal" />
      </Dialog>

      <DialogConfirmation :dialog="dialogConfirmation" :message="l.actions.message" @noAction="dialogConfirmation = false" @yesAction="save" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TypePageMixin from '@/mixins/TypePageMixin';
import Button from '@/components/vuetify/Button';
import Items from '../components/Items';
import Dialog from '@/components/vuetify/Dialog';
import DialogAddItem from '../components/DialogAddItem';
import DialogConfirmation from '@/components/DialogConfirmation';
import AppointmentData from '../components/AppointmentData';
import Totalizers from '../components/Totalizers';
import { messageErrors } from '@/utils';
import { appointmentStatus } from '@/utils/enums';

const dialogComponents  = Object.freeze({
  items: DialogAddItem,
});

export default {
  name: 'CreateAppointment',
  components: {
    PageHeader,
    PageContent,
    ExpansionPanel,
    Button,
    Items,
    Dialog,
    DialogAddItem,
    DialogConfirmation,
    AppointmentData,
    Totalizers,
  },
  data() {
    return {
      expModel: [0],
      loading: false,
      appointment: {
        initial_hour: '00:00:00',
        final_hour: '00:00:00',
        appointment_date: new Date().toISOString().substr(0, 10),
        appointment_number: 0,
        qtd_items: 0,
        amount: 0,
        items: [],
        items_destroy: [],
      },
      collaborators: [],
      customers: [],
      dialog: false,
      dialogComponent: null,
      dialogProps: {},
      dialogConfirmation: false,
    };
  },
  provide() {
    return {
      appointment:  this.appointment,
    };
  },
  mounted() {
    if (this.typePage === this.typePageOptions.show)
      this.getAppointment();

    if (this.typePage === this.typePageOptions.create)
      this.getLastAppointmentNumber();

    this.getCollaborators();
    this.getCustomers();
  },
  computed: {
    l () {
      return this.$locales.pt.appointments.CreateAppointment;
    },
    id() {
      return this.$route.params.id;
    },
    headersItems() {
      return this.$schemas.appointment.headerAppointmentItems;
    },
    appointmentFinished() {
      return this.appointment.status === appointmentStatus.DONE || false;
    },
    saveFinished() {
      return this.appointment.total_paid >= this.appointment.amount || false;
    },
    dateNow () {
      return new Date().toISOString().substr(0, 10);
    },
    appointmentDataProps () {
      return { customers: this.customers, collaborators: this.collaborators, appointmentFinished:  this.appointmentFinished };
    },
    ItemsProps () {
      return { actionType: 'openDialog', componentType: 'items', loading:  this.loading, headers: this.headersItems,
        items: this.appointment.items };
    }
  },
  mixins: [TypePageMixin],
  methods: {
    getAppointment() {
      this.loading = true;
      this.$api.appointments.show(this.id).then((res) => {
        this.mountForm(res);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    getLastAppointmentNumber() {
      this.$api.appointments.lastAppointmentNumber().then((res) => {
        this.appointment.appointment_number = res.data.appointment_number + 1;
      }).catch(() => {
        this.loading = false;
      });
    },
    getCollaborators(params = {}) {
      const payload = { ...params, filter: { type: 'collaborator' }};
      this.$api.registers.filters(payload).then((res) => {
        this.collaborators = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          };
        });
      }).catch(() => {
        this.loading = false;
      });
    },
    getCustomers(params = {}) {
      const payload = { ...params, filter: { type: 'customer' }};
      this.$api.registers.filters(payload).then((res) => {
        this.customers = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          };
        });
      }).catch(() => {
        this.loading = false;
      });
    },
    openDialog({ componentType }) {
      this.dialog = true;
      this.setPropsDialog(componentType);
      this.dialogComponent = dialogComponents[componentType];
    },
    setPropsDialog(componentType) {
      this.dialogProps = { ...componentType === 'items' && { collaborators: this.collaborators }};
    },
    handleAction(data) {
      const { type, params } = data;
      this[type](params);
    },
    handleActionModal(data) {
      const { action, item } = data;
      this.dialog = false;
      this[action](item);
    },
    addItem(item) {
      this.appointment.items.push({
        id: item.id,
        collaborator: item.collaborator,
        collaborator_id: item.collaborator?.id,
        amount: item.sale_value,
        amount_formatted: item.sale_value_formatted,
        discount: 0,
        discount_formatted: 'R$0,00',
        number_item: this.setNumberItem(),
        quantity: 1,
        service: { name: item.name },
        service_id: item.id,
        subtotal: item.sale_value,
        subtotal_formatted: item.sale_value_formatted,
        newItem: true,
      });
      this.totalizers();
    },
    itemDestroy(params) {
      const { index, componentType, item } = params;
      if (componentType === 'items') {
        this.appointment.items.splice(index, 1);
        this.appointment.items_destroy.push(item);
      }
      this.totalizers();
    },
    confirmSave(data) {
      const { status } = data;
      this.appointment.status = status;
      this.dialogConfirmation = true;
    },
    save() {
      this.typePage === this.typePageOptions.create ? this.create() : this.update();
    },
    create() {
      this.$api.appointments.create(this.appointment).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.createdRegister);
        this.$router.push({ name: this.$schemas.appointment.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    update() {
      const { id } = this.$route.params;
      this.$api.orderServices.update(id, this.appointment).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.updatedRegister);
        this.$router.push({ name: this.$schemas.orderService.routes.list.name });
      }).catch((err) => {
        this.$noty.error(messageErrors(err));
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    mountForm(data) {
      this.appointment = {
        order_date: data.order_date,
        order_number: data.order_number,
        customer_id: data.customer_id,
        collaborator_id: data.collaborator_id,
        appointment_id: (this.$route.query.appointment_id || data.appointment_id) || null,
        quantity_services: data.quantity_services,
        subtotal: data.subtotal,
        discount: data.discount,
        amount: data.amount,
        total_paid: data.total_paid,
        total_payable: 0,
        status: data.status,
        items: [],
        payments: [],
        items_destroy: [],
        payments_destroy: [],
      };

      this.appointment.items = data.items.map((item) => {
        return {
          id: item.id,
          number_item: item.number_item,
          collaborator: { id: item.collaborator.id, name: item.collaborator.name },
          collaborator_id: item.collaborator.id,
          service: { name: item.service.name },
          subtotal: item.subtotal,
          subtotal_formatted: item.subtotal_formatted,
          quantity: item.quantity,
          discount: item.discount,
          discount_formatted: item.discount_formatted,
          amount: item.amount,
          amount_formatted: item.amount_formatted,
          newItem: false
        };
      });

      this.appointment.payments = data.payments.map((item) => {
        return {
          id: item.id,
          bank_id: item.bank_id,
          payment_date: item.payment_date,
          payment_date_formatted: item.payment_date_formatted,
          payment_method: { description: item.payment_method.description },
          payment_method_id: item.payment_method_id,
          card_flag: { description: item.card_flag?.description },
          card_flag_id: item.card_flag_id,
          amount_paid: item.amount_paid,
          amount_paid_formatted: item.amount_paid_formatted,
          newItem: false
        };
      });

      this.totalizers();
    },
    setNumberItem() {
      return this.appointment.items.length + 1;
    },
    totalizers() {
      let quantity_services = 0;
      let subtotal = 0;
      let discount = 0;
      let amount = 0;
      this.appointment.items.forEach((item) => {
        quantity_services += 1;
        subtotal += parseFloat(item.subtotal);
        discount += parseFloat(item.discount);
        amount += parseFloat(item.amount);
      });

      this.appointment.quantity_services = quantity_services;
      this.appointment.subtotal = subtotal;
      this.appointment.discount = discount;
      this.appointment.amount = amount;
    },
  }
};
</script>

<style lang="scss" scoped>
.btn-actions {
  width: 150px;
}

.payments {
  min-height: 350px;
}

.totalizers {
  height: 350px;
  div{
    background-color: #EBEBEB;
    border-radius: 5px;
  }
}
</style>