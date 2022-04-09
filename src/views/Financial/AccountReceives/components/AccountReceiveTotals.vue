<template>
  <v-row>
    <v-col cols="12" md="4">
      <TextFieldMoney
        v-model="accountReceive.amount_pending"
        label="Valor Pendente"
        :readonly="true" />
    </v-col>
    <v-col cols="12" md="4">
      <TextFieldMoney
        v-model="accountReceive.amount_receive"
        label="Valor Pago"
        :readonly="true" />
    </v-col>
    <v-col cols="12" md="4">
      <TextFieldMoney
        v-model="accountReceive.amount"
        label="Valor Total"
        :readonly="true" />
    </v-col>
  </v-row>
</template>

<script>
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';

export default {
  name: 'AccountReceiveTotals',
  components: {
    TextFieldMoney,
  },
  props: {
    accountReceive: {
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