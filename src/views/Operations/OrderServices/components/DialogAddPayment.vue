<template>
  <Card title="Fazer Pagamento">
    <v-form v-model="valid" ref="formPayment" lazy-validation>
      <v-row>
        <v-col cols="12" md="2"><DataPicker v-model="form.payment_date" label="Data do Pagamento" :rules="[rules.required]" /></v-col>
        <v-col cols="12" md="2"><AutoComplete v-model="form.bank" label="Banco" return-object  :items="localBanks" :rules="[rules.requiredAutoComplete]" /></v-col>
        <v-col cols="12" md="3"><AutoComplete v-model="form.payment_method" label="Forma de Pagamento" return-object  :items="localPaymentMethods" :rules="[rules.requiredAutoComplete]" /></v-col>
        <v-col cols="12" md="3"><AutoComplete v-model="form.card_flag" label="Bandeira" return-object  :items="localCardFlags" /></v-col>
        <v-col cols="12" md="2"><TextFieldMoney v-model="form.value" label="Valor" :rules="[rules.money]" /></v-col>
      </v-row>

      <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded class="" @click="$emit('update:dialog', false)" />
      <Button label="Fazer Pagamento" :icon="$icons.plus" color="secondary" rounded class="ml-3" @click="payment()" />
    </v-form>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import DataPicker from '@/components/vuetify/DataPicker';
import AutoComplete from '@/components/vuetify/AutoComplete';
import { required, biggerZero, requiredAutoComplete, money } from '@/utils/rules';

export default {
  name: 'DialogAddPayment',
  components: { Card, Button, TextFieldMoney, DataPicker, AutoComplete },
  props: {
    banks: {
      type: Array,
      default: () => []
    },
    payment_methods: {
      type: Array,
      default: () => []
    },
    card_flags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      valid: true,
      rules: {
        required: required,
        biggerZero: biggerZero,
        requiredAutoComplete: requiredAutoComplete,
        money: money,
      },
      form: {
        payment_date: new Date().toISOString().substr(0, 10),
        bank: {},
        payment_method: {},
        card_flag: {},
        newItem: true,
      },
      localBanks: [],
      localPaymentMethods: [],
      localCardFlags: [],
    }
  },
  mounted() {
    this.localBanks = this.banks;
    this.localPaymentMethods = this.payment_methods;
    this.localCardFlags = this.card_flags;
  },
  methods: {
    payment() {
      if(!this.$refs.formPayment.validate())
        return;

      this.$emit('handleActionModal', {
        action: 'addPayment',
        item: this.form
      })
    }
  }
}
</script>

<style>

</style>