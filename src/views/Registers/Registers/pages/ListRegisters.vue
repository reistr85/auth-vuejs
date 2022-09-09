<template>
  <div>
    <PageHeader :schema="$schemas.register" />
    <PageContent>
      <DynamicListPage :schema="$schemas.register" :service="$api.registers" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import DynamicListPage from '@/components/dynamics/DynamicListPage';

export default {
  name: 'ListRegisters',
  components: { PageHeader, PageContent, DynamicListPage }
};
</script>
