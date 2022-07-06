<template>
  <div>
    <PageHeader :schema="$schemas.allType" />
    <PageContent>
      <DynamicListPage :schema="$schemas.allType" :service="$api.allTypes" fixed-filter
        :fixedFilterParams="fixedFilterParams" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListAllTypes',
  components: { PageHeader, PageContent, DynamicListPage },
  computed: {
    fixedFilterParams () {
      return { name: 'type', value: this.$route.meta.typeAllType, fixedFilter: true };
    }
  },
};
</script>
