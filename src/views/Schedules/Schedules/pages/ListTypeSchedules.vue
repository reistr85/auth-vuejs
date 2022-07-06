<template>
  <div>
    <PageHeader :schema="$schemas.typeSchedule" />
    <PageContent>
      <DynamicListPage :schema="$schemas.typeSchedule" :service="$api.typeSchedules" fixed-filter
        :fixedFilterParams="fixedFilterParams" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListTypeSchedules',
  components: { PageHeader, PageContent, DynamicListPage },
  computed: {
    fixedFilterParams () {
      return { name: 'type', value: 'typeSchedule', fixedFilter: true };
    }
  },
};
</script>
