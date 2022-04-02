<template>
  <div>
    <PageHeader :schema="$schemas.register" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.register" :service="$api.registers" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateRegister',
  components: { PageHeader, PageContent, DynamicFormPage },
};
</script>
