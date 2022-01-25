<template>
  <v-form v-model="valid" ref='form' lazy-validation>
    <v-row>
      <v-col md="2">
        <TextField v-model="address.zip_code" label="CEP" v-mask="[masks.zipCode]" />
      </v-col>
      <v-col md="2">
        <Select v-model="address.uf" label="UF" :items="options.UF" itemText="text" itemValue="value" />
      </v-col>
      <v-col md="4">
        <TextField v-model="address.city" label="Cidade" />
      </v-col>
      <v-col md="4">
        <TextField v-model="address.street" label="Endereço" />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <TextField v-model="address.neighborhood" label="Bairro" />
      </v-col>
      <v-col md="2">
        <TextField v-model="address.number" label="Número" />
      </v-col>
      <v-col md="7">
        <TextField v-model="address.complement" label="Complemento" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { calendar } from '@/utils/icons';
import { mask } from 'vue-the-mask';
import { zipCode } from '@/utils/masks';
import { UF } from '@/utils/options';
import TextField from '@/components/vuetify/TextField'
import Select from '@/components/vuetify/Select'

export default {
  name: 'AddresFormPages',
  components: { TextField, Select },
  props: {
    address: {
      type: Object,
      required: true,
    }
  },
  directives: { mask },
  data() {
    return {
      icons: {
        calendar: calendar
      },
      masks: {
        zipCode: zipCode,
      },
      options: {
        UF: UF
      },
      panel: [0],
      valid: false,
    }
  },
}
</script>

<style>

</style>