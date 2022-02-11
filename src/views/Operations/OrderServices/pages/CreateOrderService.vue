<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" title="Dados da Ordem" multiple :icon="$icons.list">
        Teste
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" title="Itens" class="mt-3" multiple :icon="$icons.list">
        <v-data-table
          dense
          :loading="loading"
          :headers="[{ text: 'Item', value: 'item' }, { text: 'Data', value: 'data' }]"
          :items="order_service.items"
          hide-default-header
          hide-default-footer />
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

export default {
  name: 'CreateCreateOrderService',
  components: { PageHeader, PageContent, ExpansionPanel },
  data() {
    return {
      schema: OrderServiceSchema,
      service: OrderServicesService,
      expModel: [0],
      loading: false,
      order_service: {
        items: []
      }
    }
  },
  mounted() {
    this.getOrderService();
  },
  methods: {
    getOrderService() {
      this.loading = true;
      OrderServicesService.show(1).then((res) => {
        this.order_service = {
          ...res,
          items: [{item: 1, data: '2022-01-01'}, {item: 2, data: '2022-01-01'}]
        }
        this.loading = false;
        console.log(this.order_service)
      }).catch(() => {
        this.loading = false;
      })
    }
  }
}
</script>