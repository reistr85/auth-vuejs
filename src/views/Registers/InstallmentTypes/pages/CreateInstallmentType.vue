<template>
  <div>
    <PageHeader :schema="$schemas.installmentType" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.installmentType" :service="$api.installmentTypes" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateInstallmentType',
  components: { PageHeader, PageContent, DynamicFormPage },
};
</script>
