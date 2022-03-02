<template>
  <div>
    <div :class="['content-main-title', height >= 500 ? 'd-flex' : '']">
      <div>
        <p class="title my-0" v-text="schema.title" />
        <h5 :class="['subtitle-2', height < 500 ? 'mb-5' : '']" v-text="schema.description" />
      </div>

      <div>
        <Button 
          color="primary"
          v-if="schema.createBtn && typePage === typePageOptions.list"
          rounded
          :label="schema.createBtn"
          :icon="icons.plusOutline"
          :class="[height < 500 ? 'btnWidth' : '']"
          @click="$router.push({ name: schema.routes.create.name })" />

        <Button 
          color="light"
          v-if="typePage === typePageOptions.create || typePage === typePageOptions.show || typePage === typePageOptions.statement"
          label="Voltar"
          rounded
          :icon="icons.arrowLeft"
          :class="[height < 500 ? 'btnWidth' : '']"
          @click="$router.push({ name: schema.routes.list.name })" />
      </div>
    </div>
    <v-divider class="my-5"></v-divider>    
  </div>
</template>

<script>
import TypePageMixin from '@/mixins/TypePageMixin';
import { plusOutline, arrowLeft } from '@/utils/icons';
import Button from '@/components/vuetify/Button';
import BreakPointMixin from '@/mixins/BreakPointMixin';

export default {
  name: 'PageHeader',
  components: { Button },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icons: {
        plusOutline: plusOutline,
        arrowLeft: arrowLeft,
      }
    }
  },
  mixins: [TypePageMixin, BreakPointMixin],
}
</script>

<style scoped>
.btnWidth {
  width: 100% !important;
}
</style>
