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
import AllTypeSchema from '../schemas/AllTypeSchema';
import AllTypesService from '../services/AllTypesService';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateAllType',
  components: { PageHeader, PageContent, DynamicFormPage },
  props: {},
  data() {
    return {
      schema: AllTypeSchema,
      service: AllTypesService,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>