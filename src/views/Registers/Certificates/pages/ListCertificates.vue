<template>
  <div>
    <PageHeader :schema="$schemas.certificate" />
    <PageContent>
      <DynamicListPage :schema="$schemas.certificate" :service="$api.certificates" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListCertificates',
  components: { PageHeader, PageContent, DynamicListPage }
};
</script>
