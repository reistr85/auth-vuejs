<template>
  <v-row>
    <v-col cols="12" md="4">
      <TextFieldMoney
        v-model="accountPayment.amount_pending"
        label="Valor Pendente"
        :disabled="true" />
    </v-col>
    <v-col cols="12" md="4">
      <TextFieldMoney
        v-model="accountPayment.amount_payment"
        label="Valor Pago" 
        :disabled="true" />
    </v-col>
    <v-col cols="12" md="4">
      <TextFieldMoney
        v-model="accountPayment.amount"
        label="Valor Total"
        :disabled="true" />
    </v-col>
  </v-row>
</template>

<script>
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';

export default {
  name: 'AccountPaymentTotals',
  components: {
    TextFieldMoney,
  },
  props: {
    accountPayment: {
      type: Object,
      return: {
        amount_pending: 0,
      }
    }
  },
};
</script>

<style>

</style>