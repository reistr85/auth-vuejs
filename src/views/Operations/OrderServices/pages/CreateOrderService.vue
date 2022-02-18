<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados da Ordem" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="2"><DataPicker v-model="order_service.order_date" label="Data da Ordem" /></v-col>
          <v-col cols="12" md="4"><AutoComplete v-model="order_service.collaborator_id" label="Colaborador" :items="collaborators" /></v-col>
          <v-col cols="12" md="4"><AutoComplete v-model="order_service.customer_id" label="Cliente" :items="customers" /></v-col>
          <v-col cols="12" md="2"><TextFieldInteger v-model="order_service.quantity_services" label="Quant. Itens" readonly /></v-col>
        </v-row>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Itens" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          action-type="openDialog"
          componentType="DialogAddItem"
          :loading="loading"
          :headers="headersItems" 
          :items="order_service.items"
          @handleAction="handleAction"/>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Pagamentos" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          action-type="openDialog"
          componentType="DialogAddPayment"
          :loading="loading"
          :headers="headersPayments" 
          :items="order_service.payments"
          @handleAction="handleAction" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Totalizadores" class="mt-3" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="4"><TextFieldMoney v-model="order_service.subtotal" label="Sub Total" readonly /></v-col>
          <v-col cols="12" md="4"><TextFieldMoney v-model="order_service.discount" label="Desconto" readonly /></v-col>
          <v-col cols="12" md="4"><TextFieldMoney v-model="order_service.amount" label="Total Final" readonly /></v-col>
        </v-row>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Ações" class="mt-3" multiple :icon="$icons.list">
        <Button label="Salvar" :icon="$icons.save" color="primary" rounded class="" @click="handleAction({ type: 'confirmSave', params: { status: $enums.orderServiceStatus.PENDING }})" />
        <Button label="Salvar e Finalizar" :icon="$icons.check" color="success" rounded class="ml-3" @click="handleAction({ type: 'confirmSave', params: { status: $enums.orderServiceStatus.FINISHED }})" />
      </ExpansionPanel>
    </PageContent>

    <Dialog no-title no-actions :dialog="dialog"  :maxWidth="parseInt(1000)">
      <component 
        slot="content" 
        :is="dialogComponent" 
        @update:dialog="dialog = $event" 
        @handleActionModal="handleActionModal" />
    </Dialog>

    <DialogConfirmation :dialog="dialogConfirmation" @noAction="dialogConfirmation = false" @yesAction="save" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import OrderServiceSchema from '../schemas/OrderServiceSchema';
import OrderServicesService from '../services/OrderServicesService';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import DataPicker from '@/components/vuetify/DataPicker';
import AutoComplete from '@/components/vuetify/AutoComplete';
import TextFieldInteger from '@/components/vuetify/TextFieldInteger';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import Button from '@/components/vuetify/Button';
import { mountParamsApiFilter } from '@/utils';
import GenericDataTable from '../components/GenericDataTable';
import Dialog from '@/components/vuetify/Dialog';
import DialogAddItem from '../components/DialogAddItem';
import DialogAddPayment from '../components/DialogAddPayment';
import DialogConfirmation from '@/components/DialogConfirmation';
import { messageErrors } from '@/utils'

export default {
  name: 'CreateCreateOrderService',
  components: {
    PageHeader,
    PageContent,
    ExpansionPanel,
    DataPicker,
    AutoComplete,
    TextFieldInteger,
    Button,
    TextFieldMoney,
    GenericDataTable,
    Dialog,
    DialogAddItem,
    DialogAddPayment,
    DialogConfirmation
  },
  data() {
    return {
      schema: OrderServiceSchema,
      service: OrderServicesService,
      expModel: [0],
      loading: false,
      order_service: {},
      collaborators: [],
      customers: [],
      dialog: false,
      dialogComponent: null,
      dialogConfirmation: false,
    }
  },
  mounted() {
    this.getOrderService();
    this.getCollaborators();
    this.getCustomers();
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    headersItems() {
      return this.schema.order_service_items;
    },
    headersPayments() {
      return this.schema.order_service_payments;
    }
  },
  methods: {
    getOrderService() {
      this.loading = true;
      this.orderServicesService.show(this.id).then((res) => {
        this.mountForm(res);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    getCollaborators() {
      const { options, filters } = mountParamsApiFilter({ type: 'collaborator' });

      this.registersService.filters(options, filters).then((res) => {
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
    getCustomers() {
      const { options, filters } = mountParamsApiFilter({ type: 'customer' });

      this.registersService.filters(options, filters).then((res) => {
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
    openDialog({ componentType }) {
      this.dialog = true;
      this.dialogComponent = componentType;
    },
    handleAction(data) {
      const { type, params } = data;
      this[type](params);
    },
    handleActionModal(form) {
      this.dialog = false;
      console.log(form)
    },
    itemDestroy(params) {
      const { id, componentType } = params;
      if(componentType === 'DialogAddItem') {
        this.order_service.removedItems.push({ id });
      }else{
        this.order_service.removedPayments.push({ id });
      }
      console.log(this.order_service)
    },
    confirmSave(data) {
      this.order_service.status = data.status;
      this.dialogConfirmation = true;
    },
    save() {
      this.orderServicesService.update(5, this.order_service).then(() => {
        this.$noty.success(this.$locales.alerts.updatedRegister)
        this.$router.push({ name: this.schema.routes.list.name })
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
        status: data.status,
        removedItems: [],
        removedPayments: [],
        items: [],
        payments: []
      }

      this.order_service.items = data.items.map((item) => {
        return {
          id: item.id,
          number_item: item.number_item,
          collaborator: { name: item.collaborator.name },
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
    },
  }
}
</script>

<style scoped>
.btn-actions {
  width: 150px;
}
</style>