<template>
  <v-dialog
    v-model="dialog"
    persistent
    :width="maxWidth"
    class="dialog-custom"
  >
    <v-card class="">
      <v-card-title v-if="!noTitle">
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
      default: false
    },
    maxWidth: {
      type: Number,
      default: 800
    },
    noTitle: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style>

</style>