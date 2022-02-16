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
          :loading="loading"
          :headers="headersItems" 
          :items="order_service.items"
          @handleAction="handleAction"/>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Pagamentos" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
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

      <div class="mt-3">
        <Button label="Salvar" :icon="$icons.save" color="primary" rounded class="" />
        <Button label="Salvar e Finalizar" :icon="$icons.check" color="success" rounded class="ml-3" />
      </div>
    </PageContent>
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
import GenericDataTable from '../components/GenericDataTable.vue';

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
  },
  data() {
    return {
      schema: OrderServiceSchema,
      service: OrderServicesService,
      expModel: [0],
      loading: false,
      order_service: {
        collaborator_id: 0,
        customer_id: 0,
        quantity_services: 1,
        items: []
      },
      collaborators: [],
      customers: [],
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
        this.order_service = res
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
    handleAction(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
.btn-actions {
  width: 150px;
}
</style>