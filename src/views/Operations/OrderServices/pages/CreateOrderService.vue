<template>
  <div>
    <PageHeader :schema="$schemas.orderService" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados da Ordem" multiple :icon="$icons.list">
        <OrderData
          :order-service="order_service"
          :customers="customers"
          :collaborators="collaborators"
          :order-finished="orderFinished" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Itens" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          action-type="openDialog"
          componentType="items"
          :loading="loading"
          :headers="headersItems" 
          :items="order_service.items"
          :order-finished="orderFinished"
          @handleAction="handleAction"/>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Pagamentos" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          action-type="openDialog"
          componentType="payments"
          :loading="loading"
          :headers="headersPayments" 
          :items="order_service.payments"
          :order-finished="orderFinished"
          @handleAction="handleAction" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Totalizadores" class="mt-3" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.subtotal" label="Sub Total" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.discount" label="Desconto" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.amount" label="Total Final" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.total_paid" label="Total Pago" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.total_payable" label="Falta Pagar" readonly /></v-col>
          <v-col cols="12" md="2"><TextFieldMoney v-model="order_service.thing" label="Troco" readonly /></v-col>
        </v-row>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Ações" class="mt-3" multiple :icon="$icons.list">
        <Button
          label="Salvar"
          color="primary"
          rounded
          class=""
          :icon="$icons.save"
          :disabled="orderFinished"
          @click="handleAction({ type: 'confirmSave', params: { status: $enums.orderServiceStatus.PENDING }})" />
        <Button
          label="Salvar e Finalizar"
          color="success"
          rounded
          class="ml-3"
          :icon="$icons.check"
          :disabled="orderFinished"
          @click="handleAction({ type: 'confirmSave', params: { status: $enums.orderServiceStatus.FINISHED }})" />
      </ExpansionPanel>

      <Dialog no-title no-actions :dialog="dialog"  :maxWidth="parseInt(1100)">
        <component 
          slot="content" 
          v-bind="dialogProps"
          :is="dialogComponent"
          @update:dialog="dialog = $event" 
          @handleActionModal="handleActionModal" />
      </Dialog>

      <DialogConfirmation :dialog="dialogConfirmation" @noAction="dialogConfirmation = false" @yesAction="save" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import Button from '@/components/vuetify/Button';
import GenericDataTable from '../components/GenericDataTable';
import Dialog from '@/components/vuetify/Dialog';
import DialogAddItem from '../components/DialogAddItem';
import DialogAddPayment from '../components/DialogAddPayment';
import DialogConfirmation from '@/components/DialogConfirmation';
import OrderData from '../components/OrderData';
import { messageErrors, formatDate, formatCurrency } from '@/utils'
import { orderServiceStatus } from '@/utils/enums';

const dialogComponents  = Object.freeze({
  items: DialogAddItem,
  payments: DialogAddPayment,
});

export default {
  name: 'CreateCreateOrderService',
  components: {
    PageHeader,
    PageContent,
    ExpansionPanel,
    Button,
    TextFieldMoney,
    GenericDataTable,
    Dialog,
    DialogAddItem,
    DialogAddPayment,
    DialogConfirmation,
    OrderData,
  },
  data() {
    return {
      expModel: [0],
      loading: false,
      order_service: {},
      collaborators: [],
      customers: [],
      payment_methods: [],
      card_flags: [],
      banks: [],
      dialog: false,
      dialogComponent: null,
      dialogProps: {},
      dialogConfirmation: false,
    }
  },
  mounted() {
    this.getOrderService();
    this.getCollaborators();
    this.getCustomers();
    this.getMethodPayments();
    this.getCardFlags();
    this.getBanks();
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    headersItems() {
      return this.$schemas.orderService.headerOrderServiceItems;
    },
    headersPayments() {
      return this.$schemas.orderService.headerOrderServicePayments;
    },
    orderFinished() {
      return this.order_service.status === orderServiceStatus.FINISHED || false;
    }
  },
  methods: {
    getOrderService() {
      this.loading = true;
      this.$api.orderServices.show(this.id).then((res) => {
        this.mountForm(res);
        this.loading = false;
      }).catch((err) => {
        console.error(err)
        this.loading = false;
      })
    },
    getCollaborators(params = {}) {
      const payload = { ...params, filter: { type: 'collaborator' }};
      this.$api.registers.filters(payload).then((res) => {
        this.collaborators = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          }
        })
      }).catch(() => {
        this.loading = false;
      })
    },
    getCustomers(params = {}) {
      const payload = { ...params, filter: { type: 'customer' }};
      this.$api.registers.filters(payload).then((res) => {
        this.customers = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          }
        })
      }).catch(() => {
        this.loading = false;
      })
    },
    getMethodPayments(params = {}) {
      const payload = { ...params, filter: { type: 'payment-method' }};
      this.$api.allTypes.filters(payload).then((res) => {
        this.payment_methods = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          }
        })
      }).catch(() => {
        this.loading = false;
      })
    },
    getCardFlags(params = {}) {
      const payload = { ...params, filter: { type: 'card-flag' }};
      this.$api.allTypes.filters(payload).then((res) => {
        this.card_flags = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          }
        })
      }).catch(() => {
        this.loading = false;
      })
    },
    getBanks() {
      this.$api.banks.index().then((res) => {
        this.banks = res.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          }
        })
      }).catch(() => {
        this.loading = false;
      })
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
      }
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
        amount: item.sale_value,
        amount_formatted: item.sale_value_formatted,
        discount: 0,
        discount_formatted: 'R$0,00',
        number_item: this.setNumberItem(),
        quantity: 1,
        service: { name: item.name },
        subtotal: item.sale_value,
        subtotal_formatted: item.sale_value_formatted,
        newItem: true,
      })
      this.totalizers();
    },
    addPayment(item) {
      this.order_service.payments.push({
        id: null,
        payment_date: item.payment_date,
        payment_date_formatted: formatDate(item.payment_date),
        payment_method: { description: item.payment_method.text },
        card_flag: { description: item.card_flag?.text },
        amount_paid: item.value,
        amount_paid_formatted: formatCurrency(item.value),
        newItem: true
      });
    },
    itemDestroy(params) {
      const { index, componentType, item } = params;
      if(componentType === 'items') {
        this.order_service.items.splice(index, 1)
        this.order_service.items_destroy.push(item)
      }
      this.totalizers();
    },
    confirmSave(data) {
      this.order_service.status = data.status;
      this.dialogConfirmation = true;
    },
    save() {
      this.orderServicesService.update(5, this.order_service).then(() => {
        this.$noty.success(this.$locales.alerts.updatedRegister)
        this.$router.push({ name: this.$schemas.orderService.routes.list.name })
      }).catch((err) => {
        this.$noty.error(messageErrors(err))
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    mountForm(data) {
      this.order_service = {
        order_date: data.order_date,
        customer_id: data.customer_id,
        collaborator_id: data.collaborator_id,
        quantity_services: data.quantity_services,
        subtotal: data.subtotal,
        discount: data.discount,
        amount: data.amount,
        total_paid: data.total_paid,
        total_payable: 0,
        thing: 0,
        status: data.status,
        items: [],
        payments: [],
        items_destroy: [],
        payments_destroy: [],
      }

      this.order_service.items = data.items.map((item) => {
        return {
          id: item.id,
          number_item: item.number_item,
          collaborator: { id: item.collaborator.id, name: item.collaborator.name },
          service: { name: item.service.name },
          subtotal: item.subtotal,
          subtotal_formatted: item.subtotal_formatted,
          quantity: item.quantity,
          discount: item.discount,
          discount_formatted: item.discount_formatted,
          amount: item.amount,
          amount_formatted: item.amount_formatted,
          newItem: false
        }
      });

      this.order_service.payments = data.payments.map((item) => {
        return {
          id: item.id,
          payment_date: item.payment_date,
          payment_date_formatted: item.payment_date_formatted,
          payment_method: { description: item.payment_method.description },
          card_flag: { description: item.card_flag?.description },
          amount_paid: item.amount_paid,
          amount_paid_formatted: item.amount_paid_formatted,
          newItem: false
        }
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
      this.order_service.total_payable = amount - total_paid;
      this.order_service.thing = total_paid > amount ? total_paid - amount : 0;
    }
  }
}
</script>

<style scoped>
.btn-actions {
  width: 150px;
}
</style>