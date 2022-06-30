<template>
  <div>
    <PageHeader :schema="$schemas.typeSchedule" />
    <PageContent>
      <DynamicListPage :schema="$schemas.typeSchedule" :service="$api.typeSchedules" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListTypeSchedules',
  components: { PageHeader, PageContent, DynamicListPage }
};
</script>
