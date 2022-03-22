<template>
  <div>
    <PageHeader
      :schema="$schemas.allType"
      :create-btn="createBtnName"
      :create-btn-route="createBtnRoute" />
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

const TYPES = Object.freeze({
  categories: { filter: 'category', label: 'Nova Categoria', routerName: 'categories-create' },
  subcategories: { filter: 'sub-category', label: 'Nova Sub Categoria', routerName: 'subcategories-create' },
  paymentmethods: { filter: 'payment-method', label: 'Nova Forma de Pagemento', routerName: 'paymentmethods-create' },
  cardflags: { filter: 'card-flags', label: 'Nova Bandeira', routerName: 'cardflags-create' },
});

export default {
  name: 'ListAllType',
  components: { PageHeader, PageContent, DynamicListPage },
  data() {
    return {
      fixedFilterParams: {},
      createBtnName: '',
      createBtnRoute: '',
    }
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.handler();
  },
  watch: {
    routerName() {
      this.handler();
    },
  },
  methods: {
    handler() {
      this.setFixedFilterParams();
      this.setCreateBtnName();
      this.setCreateBtnRoute();
    },
    setFixedFilterParams() {
      this.fixedFilterParams = {
        name: 'type',
        label: 'Tipo',
        value: TYPES[this.$route.name].filter,
        formattedValue: TYPES[this.$route.name].filter, noChip: true,
      }
    },
    setCreateBtnName() {
      this.createBtnName = TYPES[this.$route.name].label;
    },
    setCreateBtnRoute() {
      this.createBtnRoute = TYPES[this.$route.name].routerName;
    }
  }
}
</script>
