<template>
  <v-dialog
    v-model="dialog"
    persistent
    :max-width="maxWidth"
    class="dialog-custom"
  >
    <v-card class="">
      <v-card-title>
        <slot name="title" />
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="mt-3">
        <slot name="content" />
      </v-card-text>

      <v-card-actions class="mt-3 d-flex justify-end">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialog: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: Number,
      default: 800
    }
  }
}
</script>

<style>

</style>