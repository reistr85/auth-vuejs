<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicFormPage :schema="schema" :service="service" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import CompanySchema from '../schemas/CompanySchema';
import CompaniesService from '../services/CompaniesService';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateCompany',
  components: { PageHeader, PageContent, DynamicFormPage },
  props: {},
  data() {
    return {
      schema: CompanySchema,
      service: CompaniesService,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>