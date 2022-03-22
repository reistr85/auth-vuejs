<template>
  <v-card  min-width="350px" flat>
    <v-toolbar v-if="toolbar" :color="color" :dark="dark">
      <slot name="toolbar" />
      <v-spacer v-if="icon"></v-spacer>
      <ButtonIcon v-if="icon" :icon="$icons.dotsVertical" />
    </v-toolbar>

    <v-card-title v-else>
      <h3 v-text="title"></h3>
    </v-card-title>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import ButtonIcon from '@/components/vuetify/ButtonIcon';

export default {
  name: 'Card',
  components: { ButtonIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '',
    },
    toolbar: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    }
  }
};
</script>

<style>

</style>