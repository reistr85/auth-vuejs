<template>
  <v-row>
    <v-col cols="12" md="12">
      <TextField
        v-model="installmentType.description"
        label="Descrição" />
    </v-col>
    <v-col cols="12" md="4">
      <TextField
        v-model="installmentType.interval_installments"
        label="Dias entre Parcelas" />
    </v-col>
    <v-col cols="12" md="3">
    <Button
        label="Gerar Parcelas"
        small
        :icon="$icons.plus"
        color="secondary"
        rounded
        class="btn-actions mt-1"
        @click="openDialog()" />
    </v-col>
    <v-col cols="12" md="2">
      <Select
        v-model="installmentType.use_input_value"
        label="Usar Entrada"
        :items=typeYesNo />
    </v-col>
    <v-col cols="12" md="3">
      <TextFieldPercent
        v-model="installmentType.percent_input_value"
        label="Porcentagem de Entrada" />
    </v-col>
    <v-col cols="12" md="12">
      <TextField
        v-model="installmentType.observations"
        label="Observações" />
    </v-col>
    <Dialog no-title no-actions :dialog="dialog"  :maxWidth="parseInt(600)">
      <component
        slot="content"
        :is="dialogComponent"
        @update:dialog="dialog = $event"
        @handleActionGenerate="handleActionGenerate" />
    </Dialog>
  </v-row>
</template>

<script>
import TextField from '@/components/vuetify/TextField';
import Button from '@/components/vuetify/Button';
import Select from '@/components/vuetify/Select';
import TextFieldPercent from '@/components/vuetify/TextFieldPercent';
import Dialog from '@/components/vuetify/Dialog';
import DialogGenerateInstallment from '../components/DialogGenerateInstallment';
import { typeYesNo } from '@/utils/options';

export default {
  name: 'InstallmentTypeData',
  components: {
    TextField,
    Button,
    Select,
    TextFieldPercent,
    Dialog,
    DialogGenerateInstallment
  },
  props: {
    installmentType: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      installment: {
        interval_installments: ''
      },
      typeYesNo: typeYesNo,
      dialog: false,
      dialogComponent: null
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.dialogComponent = DialogGenerateInstallment;
    },
    handleActionGenerate(installments) {
      this.dialog = false;
      this.$emit('handleActionGenerate', installments);
    },
  }
};
</script>

<style>

</style>