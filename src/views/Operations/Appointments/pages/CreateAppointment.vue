<template>
  <div>
    <PageHeader :schema="$schemas.appointment" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados do Agendamento" multiple :icon="$icons.list">
        <OrderData v-bind="orderDataProps" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Itens" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable action-type="openDialog" componentType="items" :loading="loading" :headers="headersItems"
          :items="order_service.items" :order-finished="orderFinished" @handleAction="handleAction"/>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Totalizadores" class="mt-3" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.subtotal" label="Sub Total" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.discount" label="Desconto" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.amount" label="Total Final" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.total_paid" label="Total Pago" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.total_payable" label="Falta Pagar" readonly /></v-col>
        </v-row>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Ações" class="mt-3" multiple :icon="$icons.list">
        <Button label="Salvar" color="primary" rounded :icon="$icons.save" :disabled="orderFinished"
          @click="handleAction({ type: 'confirmSave', params: { status: $enums.orderServiceStatus.PENDING }})" />
        <Button label="Salvar e Finalizar" color="success" rounded class="ml-3" :icon="$icons.check" :disabled="orderFinished || !saveFinished"
          @click="handleAction({ type: 'confirmSave', params: { status: $enums.orderServiceStatus.FINISHED }})" />
      </ExpansionPanel>

      <Dialog no-title no-actions :dialog="dialog"  :maxWidth="parseInt(1100)">
        <component slot="content" v-bind="dialogProps" :is="dialogComponent" @update:dialog="dialog = $event" @handleActionModal="handleActionModal" />
      </Dialog>

      <DialogConfirmation :dialog="dialogConfirmation" :message="dialogConfirmationMessage" @noAction="dialogConfirmation = false" @yesAction="save" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import TypePageMixin from '@/mixins/TypePageMixin';
import Button from '@/components/vuetify/Button';
import GenericDataTable from '../components/GenericDataTable';
import Dialog from '@/components/vuetify/Dialog';
import DialogAddItem from '../components/DialogAddItem';
import DialogConfirmation from '@/components/DialogConfirmation';
import OrderData from '../components/OrderData';
import { messageErrors, formatDate, formatCurrency } from '@/utils';
import { orderServiceStatus } from '@/utils/enums';

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
    TextFieldMoney,
    GenericDataTable,
    Dialog,
    DialogAddItem,
    DialogConfirmation,
    OrderData,
  },
  data() {
    return {
      expModel: [0],
      loading: false,
      order_service: {
        order_date: new Date().toISOString().substr(0, 10),
        order_number: 0,
        quantity_services: 0,
        items: [],
        payments: [],
        items_destroy: [],
        payments_destroy: [],
      },
      collaborators: [],
      customers: [],
      payment_methods: [],
      card_flags: [],
      banks: [],
      dialog: false,
      dialogComponent: null,
      dialogProps: {},
      dialogConfirmation: false,
      dialogConfirmationMessage: '',
    };
  },
  mounted() {
    if (this.typePage === this.typePageOptions.show)
      this.getOrderService();

    if (this.typePage === this.typePageOptions.create)
      this.getLastOrderNumber();

    const appointment_id = this.$route.query.appointment_id;
    if (appointment_id)
      this.getAppointment(appointment_id);

    this.getCollaborators();
    this.getCustomers();
    this.getMethodPayments();
    this.getCardFlags();
    this.getBanks();
  },
  computed: {
    l() {
      return this.$locales.pt.orderServices.createOrderService;
    },
    id() {
      return this.$route.params.id;
    },
    headersItems() {
      return this.$schemas.orderService.headerOrderServiceItems;
    },
    headersPayments() {
      return this.$schemas.orderService.headerOrderServicePayments;
    },
    orderFinished() {
      return this.order_service.status === orderServiceStatus.FINISHED || false;
    },
    saveFinished() {
      return this.order_service.total_paid >= this.order_service.amount || false;
    },
    dateNow () {
      return new Date().toISOString().substr(0, 10);
    },
    orderDataProps () {
      return { orderService: this.order_service, customers: this.customers, collaborators: this.collaborators, orderFinished:  this.orderFinished };
    }
  },
  mixins: [TypePageMixin],
  methods: {
    getOrderService() {
      this.loading = true;
      this.$api.orderServices.show(this.id).then((res) => {
        this.mountForm(res);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    getLastOrderNumber() {
      this.$api.orderServices.lastOrderNumber().then((res) => {
        this.order_service.order_number = res.data.order_number + 1;
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
    getMethodPayments(params = {}) {
      const payload = { ...params, filter: { type: 'payment-method' }};
      this.$api.allTypes.filters(payload).then((res) => {
        this.payment_methods = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          };
        });
      }).catch(() => {
        this.loading = false;
      });
    },
    getCardFlags(params = {}) {
      const payload = { ...params, filter: { type: 'card-flag' }};
      this.$api.allTypes.filters(payload).then((res) => {
        this.card_flags = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          };
        });
      }).catch(() => {
        this.loading = false;
      });
    },
    getBanks() {
      this.$api.banks.index().then((res) => {
        this.banks = res.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
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
      this.dialogProps = {
        ...componentType === 'items' && { collaborators: this.collaborators },
        ...componentType === 'payments' && {
          banks: this.banks,
          payment_methods: this.payment_methods,
          card_flags: this.card_flags
        }
      };
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
      this.order_service.items.push({
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
    addPayment(item) {
      if ((parseFloat(this.order_service.total_paid) + parseFloat(item.value)) > this.order_service.amount) {
        this.$noty.error(this.l.alerts.totalPaidGreaterAmount);
        return;
      }

      this.order_service.payments.push({
        id: null,
        bank_id: item.bank.id,
        payment_date: item.payment_date,
        payment_date_formatted: formatDate(item.payment_date),
        payment_method: { id: item.payment_method.id, description: item.payment_method.text },
        payment_method_id: item.payment_method.id,
        card_flag: { id: item.card_flag?.id, description: item.card_flag?.text },
        card_flag_id: item.card_flag?.id ? item.card_flag.id : null,
        amount_paid: item.value,
        amount_paid_formatted: formatCurrency(item.value),
        newItem: true
      });
      this.totalizers();
    },
    itemDestroy(params) {
      const { index, componentType, item } = params;
      if (componentType === 'items') {
        this.order_service.items.splice(index, 1);
        this.order_service.items_destroy.push(item);
      }
      this.totalizers();
    },
    confirmSave(data) {
      const { status } = data;
      this.order_service.status = status;
      this.dialogConfirmationMessage = status === this.$enums.orderServiceStatus.PENDING ? this.l.dialogConfirmation.message.save : this.l.dialogConfirmation.message.saveFinish;
      this.dialogConfirmation = true;
    },
    save() {
      this.typePage === this.typePageOptions.create ? this.create() : this.update();
    },
    create() {
      this.$api.orderServices.create(this.order_service).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.createdRegister);
        this.$router.push({ name: this.$schemas.orderService.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    update() {
      const { id } = this.$route.params;
      this.$api.orderServices.update(id, this.order_service).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.updatedRegister);
        this.$router.push({ name: this.$schemas.orderService.routes.list.name });
      }).catch((err) => {
        this.$noty.error(messageErrors(err));
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    mountForm(data) {
      this.order_service = {
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

      this.order_service.items = data.items.map((item) => {
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

      this.order_service.payments = data.payments.map((item) => {
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
      return this.order_service.items.length + 1;
    },
    totalizers() {
      let quantity_services = 0;
      let subtotal = 0;
      let discount = 0;
      let amount = 0;
      let total_paid = 0;
      this.order_service.items.forEach((item) => {
        quantity_services += 1;
        subtotal += parseFloat(item.subtotal);
        discount += parseFloat(item.discount);
        amount += parseFloat(item.amount);
      });

      this.order_service.payments.forEach((payment) => {
        total_paid += parseFloat(payment.amount_paid);
      });
      this.order_service.quantity_services = quantity_services;
      this.order_service.subtotal = subtotal;
      this.order_service.discount = discount;
      this.order_service.amount = amount;
      this.order_service.total_paid = total_paid;
      this.order_service.total_payable = total_paid >= amount ? 0 :amount - total_paid;
    },
    getAppointment (id) {
      this.$api.appointments.show(id).then((res) => {
        const appointment = res;
        this.mountForm({
          order_date: this.dateNow,
          customer_id: appointment.customer_id,
          collaborator_id: appointment.collaborator_id,
          quantity_services: appointment.items.length,
          subtotal: 0,
          discount: 0,
          amount: 0,
          total_paid: 0,
          total_payable: 0,
          status: this.$enums.orderServiceStatus.PENDING,
          items: appointment.items.map((item, index) => {
            return {
              id: item.id,
              number_item: index + 1,
              collaborator: { id: appointment.collaborator.id, name: appointment.collaborator.name },
              collaborator_id: appointment.collaborator.id,
              service: { name: item.service.name },
              subtotal: item.subtotal,
              subtotal_formatted: formatCurrency(item.subtotal),
              quantity: item.quantity,
              discount: item.discount,
              discount_formatted: formatCurrency(item.discount),
              amount: item.amount,
              amount_formatted: formatCurrency(item.amount),
              newItem: true
            };
          }),
          payments: [],
          items_destroy: [],
          payments_destroy: [],
        });
        this.getLastOrderNumber();
      }).catch(() => {

      });
    }
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