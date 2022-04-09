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
import AccountReceiveSchema from '../schemas/AccountReceiveSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import AccountReceivesService from '../services/AccountReceivesService';

export default {
  name: 'ListAccountReceives',
  components: { PageHeader, PageContent, DynamicListPage },
  props: {},
  data() {
    return {
      schema: AccountReceiveSchema,
      service: AccountReceivesService,
    };
  },
};

</script>

<style lang="scss" scoped>

</style>