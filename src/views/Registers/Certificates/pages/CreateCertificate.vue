<template>
  <div>
    <PageHeader :schema="$schemas.certificate" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.certificate" :service="$api.certificates" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateCertificate',
  components: { PageHeader, PageContent, DynamicFormPage },
};
</script>
