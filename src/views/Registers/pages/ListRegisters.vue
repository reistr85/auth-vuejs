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
import RegisterSchema from '../schemas/RegisterSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import RegistersService from '../services/RegistersService';

export default {
  name: 'ListRegister',
  components: { PageHeader, PageContent, DynamicListPage },
  props: {},
  data() {
    return {
      schema: RegisterSchema,
      service: RegistersService,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>