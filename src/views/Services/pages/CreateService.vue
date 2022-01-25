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
import ServiceSchema from '../schemas/ServiceSchema';
import ServicesService from '../services/ServicesService';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateRegister',
  components: { PageHeader, PageContent, DynamicFormPage },
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