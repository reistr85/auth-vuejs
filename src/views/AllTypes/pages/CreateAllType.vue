<template>
  <div>
    <PageHeader :schema="$schemas.allType" />
    <PageContent>
      <DynamicFormPage :schema="$schemas.allType" :service="$api.allTypes" :fixed-payload="fixedPayload" />
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
  computed: {
    fixedPayload () {
      return { type: this.$route.meta.typeAllType };
    }
  }
};
</script>
