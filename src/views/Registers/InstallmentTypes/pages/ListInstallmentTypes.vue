<template>
  <div>
    <PageHeader :schema="$schemas.installmentType" />
    <PageContent>
      <DynamicListPage :schema="$schemas.installmentType" :service="$api.installmentTypes" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListInstallmentTypes',
  components: { PageHeader, PageContent, DynamicListPage },
};
</script>
