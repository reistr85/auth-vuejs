<template>
  <div>
    <PageHeader :schema="$schemas.service" />
    <PageContent>
      <DynamicListPage :schema="$schemas.service" :service="$api.services" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListService',
  components: { PageHeader, PageContent, DynamicListPage },
};
</script>
