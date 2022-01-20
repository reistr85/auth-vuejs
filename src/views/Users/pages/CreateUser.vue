<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      Create Users
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import UserSchema from '../schemas/UserSchema';

export default {
  name: 'CreateUser',
  components: { PageHeader, PageContent },
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