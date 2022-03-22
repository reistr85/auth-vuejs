<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicListPage :schema="schema" :service="service" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import AppointmentSchema from '../schemas/AppointmentSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import AppointmentsService from '../services/AppointmentsService';

export default {
  name: 'ListAppointments',
  components: { PageHeader, PageContent, DynamicListPage },
  props: {},
  data() {
    return {
      schema: AppointmentSchema,
      service: AppointmentsService,
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>