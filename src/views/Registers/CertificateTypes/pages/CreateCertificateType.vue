<template>
  <div>
    <PageHeader :schema="$schemas.certificateType" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.certificateType" :service="$api.certificateTypes" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateCertificateType',
  components: { PageHeader, PageContent, DynamicFormPage },
  data() {
    return {};
  }
};
</script>
