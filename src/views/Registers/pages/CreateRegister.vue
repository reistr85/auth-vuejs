<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      Create Registers
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import RegisterSchema from '../schemas/RegisterSchema';

export default {
  name: 'CreateRegister',
  components: { PageHeader, PageContent },
  props: {},
  data() {
    return {
      schema: RegisterSchema,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>