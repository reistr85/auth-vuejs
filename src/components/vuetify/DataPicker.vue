<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="true"
      :nudge-right="40"
      :disabled="readonly"
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
          @change="changeDate()" />
      </template>
      <v-date-picker
        v-model="date"
        @input="menu = false" />
    </v-menu>
  </div>
</template>

<script>
import { formatDate, formatDateEN } from '@/utils';
import { mask } from "vue-the-mask";
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'DataPicker',
  components: { TextField },
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
    icon: {
      type: String,
      default: '',
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
        this.dateFormatted = formatDate(this.model);
      },
      deep: true,
    },
    date: {
      handler() {
        this.dateFormatted = formatDate(this.date);
        this.$emit('changeDataPick', { model: this.modelName, date: this.date });
      },
      deep: true,
    },
  },
  directives: {
    mask,
  },
  data() {
    return {
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.noInitial ? null : formatDate(new Date().toISOString().substr(0, 10)),
    }
  },
  methods: {
    changeDate() {
      this.menu = false;
      this.$emit('changeDataPick', { model: this.modelName, date: formatDateEN(this.dateFormatted) });
    }
  }
}
</script>

<style>

</style>