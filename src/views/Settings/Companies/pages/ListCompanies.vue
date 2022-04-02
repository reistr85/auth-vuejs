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
import CompanySchema from '../schemas/CompanySchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import CompaniesService from '../services/CompaniesService';

export default {
  name: 'ListCompanies',
  components: { PageHeader, PageContent, DynamicListPage },
  props: {},
  data() {
    return {
      schema: CompanySchema,
      service: CompaniesService,
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>