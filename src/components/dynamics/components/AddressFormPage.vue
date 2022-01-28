<template>
  <v-form v-model="valid" ref='form' lazy-validation>
    <v-row>
      <v-col sm="12" md="6" lg="3">
        <TextFieldSimpleMask v-model="address.zip_code" label="CEP" v-bind="propsZipCode" :loading="loading" />
      </v-col>
      <v-col sm="12" md="6" lg="2">
        <Select v-model="address.uf" label="UF" :items="options.UF" itemText="text" itemValue="value" :loading="loading" />
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <TextField v-model="address.city" label="Cidade" :loading="loading" />
      </v-col>
      <v-col sm="12" md="6" lg="3">
        <TextField v-model="address.neighborhood" label="Bairro" :loading="loading" />
      </v-col>
    </v-row>
    
    <v-row>
      <v-col sm="12" md="6" lg="6">
        <TextField v-model="address.street" label="Endereço" :loading="loading" />
      </v-col>
      <v-col sm="12" md="6" lg="2">
        <TextField v-model="address.number" label="Número" :loading="loading" />
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <TextField v-model="address.complement" label="Complemento" :loading="loading" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { calendar } from '@/utils/icons';
import { mask } from 'vue-the-mask';
import { zipCode } from '@/utils/masks';
import { UF } from '@/utils/options';
import { debounce } from "@/plugins/debounce.js";
import TextField from '@/components/vuetify/TextField'
import TextFieldSimpleMask from '@/components/vuetify/TextFieldSimpleMask'
import Select from '@/components/vuetify/Select'
import axios from 'axios';

export default {
  name: 'AddresFormPages',
  components: { TextField, Select, TextFieldSimpleMask },
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
      loading: false,
    }
  },
  computed: {
    propsZipCode() {
      return { 
        required: true,
        list: true,
        readonly: false,
        disabled: false,
        inputMask: '##.###-###',
        outputMask: '########',
        applyAfter: false,
        empty: null,
      }
    }
  },
  watch: {
    ['address.zip_code']: debounce(function () {
      if(this.address.zip_code.length === 8) {
        this.getAddress();
      }
    }, 2000),
  },
  methods: {
    getAddress() {
      this.loading = true;
      axios.get(`zip-code-open?zip_code=${this.address.zip_code}`).then((res) => {
        this.loading = false;
        this.$emit('setAddressByZipCode', res.data);
      }).catch(() => {
        this.$noty.error('Erro ao localizar o Endereço')
        this.loading = false;
        this.$emit('setAddressByZipCode', null);
      })
    }
  }
}
</script>

<style>

</style>