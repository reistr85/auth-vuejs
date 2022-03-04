<template>
  <div>
    <PageHeader :schema="$schemas.allType" />
    <PageContent>
      <DynamicListPage ref="dynamicListPage" :schema="$schemas.allType" :service="$api.allTypes" filters :filterParams="filterParams" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListAllType',
  components: { PageHeader, PageContent, DynamicListPage },
  data() {
    return {
      filterParams: {}
    }
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.setProps();
  },
  watch: {
    routerName() {
      this.setProps();
    },
  },
  methods: {
    setProps() {
      this.filterParams = {
        params: {},
        ...this.routerName === 'categories' && {  filter:  'category' },
        ...this.routerName === 'subcategories' && {  filter:  'sub-category' },
        ...this.routerName === 'paymentmethods' && {  filter:  'payment-method' },
        ...this.routerName === 'cardflags' && {  filter:  'card-flags' },
        customFields: ['type']
      }
      this.$refs.dynamicListPage.getFilters(this.filterParams);
    }
  }
}
</script>
