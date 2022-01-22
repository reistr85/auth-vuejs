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
import AllTypeSchema from '../schemas/AllTypeSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import AllTypesService from '../services/AllTypesService';

export default {
  name: 'ListAllType',
  components: { PageHeader, PageContent, DynamicListPage },
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