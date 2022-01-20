<template>
  <div class="content-money">
    <div :class="[icon ? 'money-icon' : '']"><v-icon>{{ icon }}</v-icon></div>
    <vuetify-money
      v-bind="$attrs"
      v-on="$listeners"
      class="`mt-5 money-content`"
      :type="type" 
      :label="label" 
      :rules="rules"
      :dense="dense"
      :readonly="readonly" 
      :counter="counter"
      :outlined="outlined"
      :disabled="disabled"
      :options="options" />
  </div>
</template>

<script>
export default {
  name: 'InputCurrency',
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
    options: {
      type: Object,
      default: () => ({
        locale: "pt-BR",
        prefix: "",
        suffix: "",
        length: 11,
        precision: 2
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.content-money {
  display: flex;
  justify-content: flex-start;

  .money-icon {
    margin-right: 10px;
    margin-top: 7px;
  }

  .money-content {
    width: 100%;
  }
}
</style>