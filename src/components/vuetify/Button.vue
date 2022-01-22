<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :outlined="outlined">
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    outlined: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>