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
import UserSchema from '../schemas/UserSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import UsersService from '../services/UsersService';

export default {
  name: 'ListUser',
  components: { PageHeader, PageContent, DynamicListPage },
  data() {
    return {
      schema: UserSchema,
      service: UsersService,
    }
  },
}
</script>
