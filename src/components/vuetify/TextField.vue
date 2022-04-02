<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    :ref="refs"
    :type="type"
    :label="label"
    :rules="rules"
    :dense="dense"
    :readonly="readonly"
    :counter="counter"
    :outlined="outlined"
    :disabled="disabled"
    :prepend-icon="icon" />
</template>

<script>
export default {
  name: 'TextField',
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
    type: {
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
    rules: {
      type: Array,
      default: () => [],
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
  },
};
</script>

<style>

</style>