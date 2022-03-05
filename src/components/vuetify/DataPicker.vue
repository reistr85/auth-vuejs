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
        v-bind="$attrs"
        v-on="$listeners"
        :readonly="readonly"
        :disabled="disabled"
        @input="menu = false" />
    </v-menu>
  </div>
</template>

<script>
import { formatDate } from '@/utils';
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
    disabled: {
      type: Boolean,
      default: false,
    },
    model: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    model: {
      handler() {
        this.dateFormatted = formatDate(this.model);
      },
      deep: true,
    },
  },
  directives: {
    mask,
  },
  mounted() {
    this.$attrs.value = this.dateFormatted;
  },
  computed: {
    dateFormatted() {
      if(this.noInitial) {
        return null;
      }else{
        return formatDate(this.$attrs.value) || formatDate(new Date().toISOString().substr(0, 10))
      }
    }
  },
  data() {
    return {
      menu: false,
    }
  },
}
</script>

<style>

</style>