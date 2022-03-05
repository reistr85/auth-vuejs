<template>
  <div>
    <PageHeader :schema="$schemas.allType" />
    <PageContent>
      <DynamicListPage
        ref="dynamicListPage"
        fixed-filter
        :schema="$schemas.allType"
        :service="$api.allTypes"
        :fixed-filter-params="fixedFilterParams" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

const TYPES_FILTER = Object.freeze({
  categories: 'category',
  subcategories: 'sub-category',
  paymentmethods: 'payment-method',
  cardflags: 'card-flags',
});

export default {
  name: 'ListAllType',
  components: { PageHeader, PageContent, DynamicListPage },
  data() {
    return {
      fixedFilterParams: {}
    }
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.setFixedFilterParams();
  },
  watch: {
    routerName() {
      this.setFixedFilterParams();
    },
  },
  methods: {
    setFixedFilterParams() {
      this.fixedFilterParams = {
        name: 'type',
        label: 'Tipo',
        value: TYPES_FILTER[this.routerName],
        formattedValue: TYPES_FILTER[this.routerName], noChip: true,
      }
    }
  }
}
</script>
