<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="true"
      :nudge-right="40"
      :disabled="readonly"
      transition="scale-transition"
      offset-y
      min-width="auto">
      
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          :outlined="outlined"
          :dense="dense"
          :label="label"
          :prepend-icon="icon"
          :readonly="readonly"
          v-mask="'##/##/####'"
          v-bind="attrs"
          v-on="on"
          @change="changeDate()" />
      </template>
      <v-date-picker
        v-model="date"
        @input="menu = false" />
    </v-menu>
  </div>
</template>

<script>
import * as Utils from '@/utils';
import { mask } from "vue-the-mask";

export default {
  name: 'DataPick',
  props: {
    label: {
      type: String,
      default: '',
    },
    modelName: {
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
    noIcon: {
      type: Boolean,
      default: false,
    },
    noInitial: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    model: {
      type: String,
      default: '',
    }
  },
  watch: {
    model: {
      handler() {
        this.dateFormatted = Utils.formatDate(this.model);
      },
      deep: true,
    },
    date: {
      handler() {
        this.dateFormatted = Utils.formatDate(this.date);
        this.$emit('changeDataPick', { model: this.modelName, date: this.date });
      },
      deep: true,
    },
  },
  computed: {
    icon() {
      if(this.noIcon)
        return '';
      
      return  'mdi-calendar';
    }
  },
  directives: {
    mask,
  },
  data() {
    return {
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.noInitial ? null : Utils.formatDate(new Date().toISOString().substr(0, 10)),
    }
  },
  methods: {
    changeDate() {
      this.menu = false;
      this.$emit('changeDataPick', { model: this.modelName, date: Utils.formatDateEN(this.dateFormatted) });
    }
  }
}
</script>

<style>

</style>