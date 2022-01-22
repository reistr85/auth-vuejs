<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicFormPage :schema="schema" :service="service" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import RegisterSchema from '../schemas/RegisterSchema';
import RegistersService from '../services/RegistersService';
import DynamicFormPage from '@/components/dynamics/DynamicFormPage';

export default {
  name: 'CreateRegister',
  components: { PageHeader, PageContent, DynamicFormPage },
  props: {},
  data() {
    return {
      schema: RegisterSchema,
      service: RegistersService,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>