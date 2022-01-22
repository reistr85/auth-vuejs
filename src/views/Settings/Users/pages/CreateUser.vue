<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicFormPage :schema="schema" :service="service" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import UserSchema from '../schemas/UserSchema';
import UsersService from '../services/UsersService';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateUser',
  components: { PageHeader, PageContent, DynamicFormPage },
  props: {},
  data() {
    return {
      schema: UserSchema,
      service: UsersService,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>