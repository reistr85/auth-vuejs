<template>
  <v-btn icon>
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
  }
};
</script>

<style>

</style>