<template>
  <div>
    <PageHeader :schema="$schemas.typeSchedule" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.typeSchedule" :service="$api.typeSchedules" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateAllTypes',
  components: { PageHeader, PageContent, DynamicFormPage },
  data() {
    return {};
  }
};
</script>
