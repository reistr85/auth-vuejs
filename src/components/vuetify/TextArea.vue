<template>
  <v-textarea
    v-bind="$attrs"
    v-on="$listeners"
    :label="label" 
    :dense="dense"
    :readonly="readonly" 
    :counter="counter"
    :outlined="outlined"
    :disabled="disabled"
    :prepend-icon="icon" />
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    id: {
      type: String,
      default: '',
    },
    refs: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    counter: {
      type: Number,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
  }
}
</script>

<style>

</style>