<template>
  <div>
    <PageHeader :schema="$schemas.service" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.service" :service="$api.services" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateService',
  components: { PageHeader, PageContent, DynamicFormPage },
};
</script>
