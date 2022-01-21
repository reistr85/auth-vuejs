<template>
  <v-select 
    hide-details="auto"
    :ref="refs"
    :id="id"
    :type="type" 
    :label="label" 
    :rules="rules"
    :dense="dense"
    :readonly="readonly" 
    :outlined="outlined"
    :disabled="disabled"
    :prepend-icon="icon"
    :loading="loading"
    :items="items"
    :item-text="itemText" 
    :item-value="itemValue">
  </v-select>
</template>

<script>
export default {
  name: 'Select',
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
    itemText: {
      type: String,
      default: '',
    },
    itemValue: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>

</style>