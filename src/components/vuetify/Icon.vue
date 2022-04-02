<template>
  <v-icon :dense="dense">{{ icon }}</v-icon>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    dense: {
      type: Boolean,
      default: false,
    }
  }
};
</script>

<style>

</style>