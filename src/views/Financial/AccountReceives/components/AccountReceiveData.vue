<template>
  <v-row>
    <v-col cols="12" md="6">
      <AutoComplete
        v-model="accountReceive.register_id"
        label="Nome"
        :items="registers"
        :readonly="accountFinished" />
    </v-col>
    <v-col cols="12" md="3">
      <DataPicker
        v-model="accountReceive.date_issuance"
        label="Data de Emissão"
        :readonly="accountFinished" />
    </v-col>
    <v-col cols="12" md="3">
      <DataPicker
        v-model="accountReceive.date_discharge"
        label="Data da Quitação"
        :readonly="true" />
    </v-col>
    <v-col cols="12" md="3">
      <TextField
        v-model="accountReceive.title"
        label="Título"
        :readonly="accountFinished" />
    </v-col>
    <v-col cols="12" md="3">
      <TextFieldMoney
        v-model="accountReceive.amount"
        label="Valor Título"
        :readonly="accountFinished" />
    </v-col>
    <v-col cols="12" md="3">
      <Select
        v-model="accountReceive.installment_types_id"
        label="Tipo de Parcelamento"
        :items="installmentType"
        :readonly="accountFinished"
        @change="changeRoute(accountReceive.installment_types_id)" />
    </v-col>
    <v-col cols="12" md="3">
      <TextField
        v-model="accountReceive.status_formatted"
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
import Select from '@/components/vuetify/Select';

export default {
  name: 'AccountReceiveData',
  components: {
    DataPicker,
    AutoComplete,
    TextField,
    TextFieldMoney,
    Select,
  },
  props: {
    accountReceive: {
      type: Object,
      default: () => {}
    },
    registers: {
      type: Array,
      default: () => []
    },
    installmentType: {
      type: Array,
      default: () => []
    },
    accountFinished: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    changeRoute(installment_types_id) {
      this.$emit('eventsGenerateInstallment', installment_types_id);
    }
  }
};
</script>

<style>

</style>