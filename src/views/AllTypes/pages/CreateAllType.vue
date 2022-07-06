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
  name: 'CreateAllTypes',
  components: { PageHeader, PageContent, DynamicFormPage },
  mounted () {
    this.$schemas.allType.fields[0].items[0].default = 'certificateType';
    console.log(this.$schemas.allType.fields[0].items[0].default);
  }
};
</script>
