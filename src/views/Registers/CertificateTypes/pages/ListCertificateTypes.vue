<template>
  <div>
    <PageHeader :schema="$schemas.certificateType" />
    <PageContent>
      <DynamicListPage :schema="$schemas.certificateType" :service="$api.certificateTypes" fixed-filter
        :fixedFilterParams="fixedFilterParams" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListCertificateTypes',
  components: { PageHeader, PageContent, DynamicListPage },
  computed: {
    fixedFilterParams () {
      return { name: 'type', value: 'certificateType', fixedFilter: true };
    }
  },
};
</script>
