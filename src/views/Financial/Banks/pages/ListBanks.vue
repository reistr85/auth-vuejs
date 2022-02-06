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
import BankSchema from '../schemas/BankSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import BanksService from '../services/BanksService';

export default {
  name: 'ListBank',
  components: { PageHeader, PageContent, DynamicListPage },
  props: {},
  data() {
    return {
      schema: BankSchema,
      service: BanksService,
    }
  },
  methods: {}
}

</script>

<style lang="scss" scoped>

</style>