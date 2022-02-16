<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :icon="typeIcon"
    :color="color"
    :outlined="outlined">
    <v-icon small :class="[{'mr-2': !typeIcon}]">{{ icon }}</v-icon>
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
    color: {
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
    },
    typeIcon: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style>

</style>