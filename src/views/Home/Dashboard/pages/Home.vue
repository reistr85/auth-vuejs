<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      Home
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import HomeSchema from '../schemas/HomeSchema';

export default {
  name: 'Home',
  components: { PageHeader, PageContent },
  props: {},
  data() {
    return {
      schema: HomeSchema,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>