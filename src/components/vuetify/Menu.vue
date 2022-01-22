<template>
  <v-menu :nudge-width="width" bottom offset-y nudge-left="0">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>{{ icons.dotsVertical }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { dotsVertical } from '@/utils/icons';

export default {
  name: 'Menu',
  props: {
    icon: {
      type: String,
      default: dotsVertical
    },
    width: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      icons: {
        dotsVertical: dotsVertical
      }
    }
  }
}
</script>

<style>

</style>