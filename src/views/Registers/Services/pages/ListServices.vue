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
import ServiceSchema from '../schemas/ServiceSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import ServicesService from '../services/ServicesService';

export default {
  name: 'ListService',
  components: { PageHeader, PageContent, DynamicListPage },
  props: {},
  data() {
    return {
      schema: ServiceSchema,
      service: ServicesService,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>