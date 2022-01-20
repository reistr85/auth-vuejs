<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicListPage :schema="schema" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import UserSchema from '../schemas/UserSchema';
import DynamicListPage from '@/components/DynamicListPage';

export default {
  name: 'ListUser',
  components: { PageHeader, PageContent, DynamicListPage },
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