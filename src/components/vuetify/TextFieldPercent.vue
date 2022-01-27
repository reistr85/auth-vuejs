<template>
  <v-text-field-percent
    v-bind="$attrs"
    v-on="$listeners"
    v-bind:label="label"
    v-bind:properties="{
      id: id,
      refs: refs,
      name: name,
      suffix: '%',
      readonly: readonly,
      disabled: disabled,
      outlined: outlined,
      clearable: clearable,
      dense: dense,
      rules: rules,
    }"
    v-bind:options="{
      locale: 'pt-BR',
      length: length,
      precision: precision,
      empty: empty,
    }"
  />
</template>

<script>
export default {
  name: 'TextFieldPercent',
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
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    length: {
      type: Number,
      default: 3,
    },
    precision: {
      type: Number,
      default: 2,
    },
    empty: {
      type: String,
      default: null,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  }
}
</script>

<style>

</style>