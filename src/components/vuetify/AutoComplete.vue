<template>
  <div>
    <v-autocomplete
      v-bind="$attrs"
      v-on="$listeners"
      clearable
      :chips="false"
      :items="localItems"
      :loading="loading"
      :search-input.sync="search"
      :ref="refs"
      :id="id"
      :label="label"
      :rules="rules"
      :dense="dense"
      :readonly="readonly" 
      :outlined="outlined"
      :disabled="disabled"
      :prepend-icon="icon"
      :item-text="itemText" 
      :item-value="itemValue"
      :multiple="multiple"
      :return-object="returnObject" />
  </div>
</template>

<script>
export default {
  name: 'AutoComplete',
  props: {
    id: {
      type: String,
      default: '',
    },
    refs: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemSubText: {
      type: String,
      default: 'sub_text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    icon: {
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
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      search: '',
      localItems: []
    }
  },
  watch: {
    search () {
      this.$emit('getItems', this.search)
    },
    items: {
      handler() {
        this.localItems = this.items;
      },
      deep: true,
    }
  },
}
</script>

<style>

</style>