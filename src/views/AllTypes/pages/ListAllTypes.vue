<template>
  <div>
    <PageHeader :schema="$schemas.allType" :create-route-name="createRouteName" :create-btn="createBtn" />
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

const CREATE_BTN = {
  certificateTypeCreate: 'Tipo de Certificado',
  certificatePeriodCreate: 'Período do Certificado',
  paymentMethodCreate: 'Forma de Pagamento',
  typeScheduleCreate: 'Tipo de Agendamento',
};

export default {
  name: 'ListAllTypes',
  components: { PageHeader, PageContent, DynamicListPage },
  computed: {
    createRouteName () {
      return this.$schemas.allType.routes[this.$route.meta.typeAllType].create.name;
    },
    createBtn () {
      return CREATE_BTN[this.$schemas.allType.routes[this.$route.meta.typeAllType].create.name];
    },
    fixedFilterParams () {
      return { name: 'type', value: this.$route.meta.typeAllType, fixedFilter: true };
    }
  },
};
</script>
