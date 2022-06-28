<template>
  <div>
    <PageHeader :schema="$schemas.user" />dddd
    <PageContent>
      <DynamicListPage :schema="$schemas.user" :service="$api.users" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListUser',
  components: { PageHeader, PageContent, DynamicListPage }
};
</script>
