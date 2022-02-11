<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" title="Dados da Ordem" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="3"><DataPicker v-model="order_service.order_date" label="Data da Ordem" /></v-col>
          <v-col cols="12" md="4"><AutoComplete v-model="order_service.order_date" label="Colaborador" :items="collaborators" /></v-col>
          <v-col cols="12" md="4"><TextField v-model="order_service.order_date" label="Cliente" /></v-col>
        </v-row>
        
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" title="Itens" class="mt-3" multiple :icon="$icons.list">
        <v-data-table
          dense
          hide-default-footer
          :loading="loading"
          :headers="headers"
          :items="order_service.items" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" title="Resumo" class="mt-3" multiple :icon="$icons.list">
        Teste
      </ExpansionPanel>
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
import TextField from '@/components/vuetify/TextField';
import AutoComplete from '@/components/vuetify/AutoComplete';

export default {
  name: 'CreateCreateOrderService',
  components: { PageHeader, PageContent, ExpansionPanel, DataPicker, TextField, AutoComplete },
  data() {
    return {
      schema: OrderServiceSchema,
      service: OrderServicesService,
      expModel: [0],
      loading: false,
      order_service: {
        items: []
      },
      collaborators: [],
    }
  },
  mounted() {
    this.getOrderService();
    this.getRegisters();
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    headers() {
      return this.schema.order_service_items;
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
    getRegisters() {
      this.registersService.index().then((res) => {
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
    }
  }
}
</script>