<template>
  <v-row>
    <v-col cols="12" md="6">
      <AutoComplete
        v-model="accountPayment.register_id"
        label="Pessoa"
        :items="registers"
        :readonly="accountFinished" />
    </v-col>
    <v-col cols="12" md="3">
      <DataPicker 
        v-model="accountPayment.date_issuance" 
        label="Data de Emissão"
        :disabled="accountFinished" />
    </v-col>
    <v-col cols="12" md="3">
      <DataPicker 
        v-model="accountPayment.date_discharge" 
        label="Data da Quitação"
        :disabled="true" />
    </v-col>
    <v-col cols="12" md="3">
      <TextField
        v-model="accountPayment.title"
        label="Título" />
    </v-col>
    <v-col cols="12" md="3">
      <TextFieldMoney
        v-model="accountPayment.amount_payment"
        label="Valor Pago"
        readonly />
    </v-col>
    <v-col cols="12" md="3">
      <TextFieldMoney
        v-model="accountPayment.amount"
        label="Valor Título" />
    </v-col>
    <v-col cols="12" md="3">
      <TextField
        v-model="accountPayment.status_formatted"
        label="Status"
        readonly />
    </v-col>
  </v-row>
</template>

<script>
import DataPicker from '@/components/vuetify/DataPicker';
import AutoComplete from '@/components/vuetify/AutoComplete';
import TextField from '@/components/vuetify/TextField';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';

export default {
  name: 'OrderData',
  components: {
    DataPicker,
    AutoComplete,
    TextField,
    TextFieldMoney,
  },
  props: {
    accountPayment: {
      type: Object,
      default: () => {}
    },
    registers: {
      type: Array,
      default: () => []
    },
    accountFinished: {
      type: Boolean,
      default: false
    },
  }
};
</script>

<style>

</style>