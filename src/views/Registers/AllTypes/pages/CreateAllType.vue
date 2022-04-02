<template>
  <div>
    <PageHeader :schema="$schemas.allType" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.allType" :service="$api.allTypes" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateAllType',
  components: { PageHeader, PageContent, DynamicFormPage },
};
</script>
