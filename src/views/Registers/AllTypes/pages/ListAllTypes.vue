<template>
  <div>
    <PageHeader
      :schema="schema"
      :create-btn="createBtnName"
      :create-btn-route="createBtnRoute" />
    <PageContent>
      <DynamicListPage
        ref="dynamicListPage"
        fixed-filter
        :schema="schema"
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
  categories: {
    filter: 'category',
    label: 'Nova Categoria',
    routerName: 'categories-create',
    routeNameShow: 'categories-show'
  },
  subcategories: {
    filter: 'sub-category',
    label: 'Nova Sub Categoria',
    routerName: 'subcategories-create',
    routeNameShow: 'subcategories-show'
  },
  paymentmethods: {
    filter: 'payment-method',
    label: 'Nova Forma de Pagemento',
    routerName: 'paymentmethods-create',
    routeNameShow: 'paymentmethods-show'
  },
  cardflags: {
    filter: 'card-flags',
    label: 'Nova Bandeira',
    routerName: 'cardflags-create',
    routeNameShow: 'cardflags-show'
  },
});

export default {
  name: 'ListAllType',
  components: { PageHeader, PageContent, DynamicListPage },
  data() {
    return {
      fixedFilterParams: {},
      createBtnName: '',
      createBtnRoute: '',
    };
  },
  computed: {
    schema () {
      return { ...this.$schemas.allType, routes: { show: { name: TYPES[this.$route.name].routeNameShow } } };
    },
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
      };
    },
    setCreateBtnName() {
      this.createBtnName = TYPES[this.$route.name].label;
    },
    setCreateBtnRoute() {
      this.createBtnRoute = TYPES[this.$route.name].routerName;
    }
  }
};
</script>
