<template>
  <div>
    <PageHeader :schema="$schemas.user" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.user" :service="$api.users" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateUser',
  components: { PageHeader, PageContent, DynamicFormPage },
  data() {
    return {};
  }
};
</script>
