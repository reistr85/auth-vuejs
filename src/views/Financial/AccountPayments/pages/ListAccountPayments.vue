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
import AccountPaymentSchema from '../schemas/AccountPaymentSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import AccountPaymentsService from '../services/AccountPaymentsService';

export default {
  name: 'ListAccountPayments',
  components: { PageHeader, PageContent, DynamicListPage },
  props: {},
  data() {
    return {
      schema: AccountPaymentSchema,
      service: AccountPaymentsService,
    }
  },
}

</script>

<style lang="scss" scoped>

</style>