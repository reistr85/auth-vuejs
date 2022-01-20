<template>
  <div>
    <div class="content-main-title">
      <div>
        <p class="title" v-text="schema.title" />
        <h5 class="subtitle-2 mt-0" v-text="schema.description" />
      </div>

      <div>
        <v-btn color="primary" class="white--text" v-if="schema.createBtn" :to="{ name: schema.routes.create.name }">
          <v-icon left dark>{{ icons.plusOutline }}</v-icon>
          {{  schema.createBtn }}
        </v-btn>
      </div>
    </div>
    <v-divider class="my-5"></v-divider>    
  </div>
</template>

<script>
import { plusOutline } from '@/utils/icons';

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
        plusOutline: plusOutline
      }
    }
  }
}
</script>

<style>

</style>