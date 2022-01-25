<template>
  <v-text-field-integer
    v-bind="$attrs"
    v-on="$listeners"
    v-model="value"
    v-bind:label="label"
    v-bind:properties="{
      id: id,
      refs: refs,
      name: name,
      readonly: readonly,
      disabled: disabled,
      outlined: outlined,
      clearable: clearable,
      dense: dense,
    }"
    v-bind:options="{
      inputMask: inputMask,
      outputMask: outputMask,
      applyAfter: applyAfter,
      empty: empty,
    }"
  />
</template>


<script>
export default {
  name: 'TextFieldInteger',
  data() {
    return {
      value: '',
    };
  },
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
    inputMask: {
      type: String,
      default: '',
    },
    outputMask: {
      type: String,
      default: '',
    },
    applyAfter: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: String,
      default: null,
    },
  }
}
</script>

<style>

</style>