<template>
  <div>
    <PageHeader :schema="$schemas.appointment" />
    <PageContent>
      <DynamicListPage :schema="$schemas.appointment" :service="$api.appointments" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListAppointments',
  components: { PageHeader, PageContent, DynamicListPage },
};
</script>
