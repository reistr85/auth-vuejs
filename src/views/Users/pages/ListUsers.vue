<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicListPageNew :schema="schema" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import UserSchema from '../schemas/UserSchema';
import DynamicListPageNew from '@/components/DynamicListPageNew';

export default {
  name: 'ListUser',
  components: { PageHeader, PageContent, DynamicListPageNew },
  props: {},
  data() {
    return {
      schema: UserSchema,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>