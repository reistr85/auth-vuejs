<template>
  <div>
    <div class="content-main-title">
      <div>
        <p class="title" v-text="schema.title" />
        <h5 class="subtitle-2 mt-0" v-text="schema.description" />
      </div>

      <div>
        <v-btn color="primary" class="white--text" v-if="schema.createBtn && typePage === 'list'" :to="{ name: schema.routes.create.name }">
          <v-icon left dark>{{ icons.plusOutline }}</v-icon>
          {{  schema.createBtn }}
        </v-btn>

        <v-btn color="primary" class="white--text" v-if="typePage === 'create'" :to="{ name: schema.routes.list.name }">
          <v-icon left dark>{{ icons.arrowLeft }}</v-icon>
          Voltar
        </v-btn>
      </div>
    </div>
    <v-divider class="my-5"></v-divider>    
  </div>
</template>

<script>
import { plusOutline, arrowLeft } from '@/utils/icons';

export default {
  name: 'PageHeader',
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
  computed: {
    typePage() {
      return this.$route.name.split('-').length === 2 ? 'create' : 'list';
    }
  }
}
</script>

<style>

</style>