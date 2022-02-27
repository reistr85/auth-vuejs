<template>
  <div>
    <v-autocomplete
      v-bind="$attrs"
      v-on="$listeners"
      clearable
      hide-details
      hide-selected
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
      :return-object="returnObject"
    >
      <!-- <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            <strong>{{ label }}</strong>
          </v-list-item-title>
        </v-list-item>
      </template>

      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip v-bind="attr" :input-value="selected" color="blue-grey" class="white--text" v-on="on">
          <span v-text="item[itemText]"></span>
        </v-chip>
      </template>

      <template v-slot:item="{ item }">
        <v-list-item-avatar color="indigo" class="text-h5 font-weight-light white--text">
          {{ item[itemText].charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item[itemText]"></v-list-item-title>
          <v-list-item-subtitle v-text="item[itemSubText]"></v-list-item-subtitle>
        </v-list-item-content>
      </template> -->
    </v-autocomplete>
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