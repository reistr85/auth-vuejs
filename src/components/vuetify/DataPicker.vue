<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="true"
      :nudge-right="40"
      :disabled="disabled"
      offset-y
      min-width="auto">

      <template v-slot:activator="{ on, attrs }">
        <TextField
          v-model="dateFormatted"
          v-on="on"
          v-bind="attrs"
          :outlined="outlined"
          :dense="dense"
          :label="label"
          :icon="icon"
          :readonly="readonly"
          :disabled="disabled"
          :rules="rules" />
      </template>
      <v-date-picker
        v-model="picker"
        v-on="$listeners"
        :readonly="readonly"
        :disabled="disabled"
        @input="menu = false" />
    </v-menu>
  </div>
</template>

<script>
import { formatDate, formatDateEN } from '@/utils';
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'DataPicker',
  components: { TextField },
  props: {
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
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
    rules: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    picker: {
      handler() {
        this.dateFormatted = formatDate(this.picker);
      },
      deep: true
    },
    $attrs: {
      handler() {
        this.getDate();
      },
      deep: true
    }
  },
  mounted() {
    this.getDate();
  },
  data() {
    return {
      menu: false,
      activePicker: null,
      dateFormatted: null,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    };
  },
  methods: {
    getDate() {
      this.dateFormatted = formatDate(this.$attrs.value);
      this.picker = formatDateEN(this.dateFormatted);
    }
  }
};
</script>
