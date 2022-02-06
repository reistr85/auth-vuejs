<template>
  <v-dialog
    v-model="dialog"
    persistent
    :width="maxWidth"
    class="dialog-custom"
  >
    <v-card >
      <v-card-title v-if="!noTitle">
        <slot name="title" />
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="px-0 py-0">
        <slot name="content" />
      </v-card-text>

      <v-card-actions class="mt-3 d-flex justify-end" v-if="!noActions">
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
    noActions: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style>

</style>