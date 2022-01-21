<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicFormPage :schema="schema" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import UserSchema from '../schemas/UserSchema';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateUser',
  components: { PageHeader, PageContent, DynamicFormPage },
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