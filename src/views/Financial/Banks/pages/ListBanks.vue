<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicListPage :schema="schema" :service="service" @actionMoreActions="actionMoreActions" />
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
    };
  },
  methods: {
    actionMoreActions(item) {
      this[item.i.action](item);
    },
    bankStatement(item) {
      const id = item.dataListProps.item.id;
      this.$router.push({ name: BankSchema.routes.statement.name, params: { id } });
    }
  }
};

</script>

<style lang="scss" scoped>

</style>