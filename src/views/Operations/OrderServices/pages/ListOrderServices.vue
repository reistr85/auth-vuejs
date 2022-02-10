<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicListPage :schema="schema" :service="service" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import OrderServiceSchema from '../schemas/OrderServiceSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import OrderServicesService from '../services/OrderServicesService';

export default {
  name: 'ListOrderServices',
  components: { PageHeader, PageContent, DynamicListPage },
  data() {
    return {
      schema: OrderServiceSchema,
      service: OrderServicesService,
    }
  },
}
</script>