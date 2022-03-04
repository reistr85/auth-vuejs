<template>
  <Card title="Fazer Pagamento">
    <v-row>
      <v-col cols="12" md="3"><DataPicker v-model="form.payment_date" label="Data do Pagamento" /></v-col>
      <v-col cols="12" md="3"><AutoComplete v-model="form.payment_method" label="Forma de Pagamento" return-object  :items="localPaymentMethods" /></v-col>
      <v-col cols="12" md="3"><AutoComplete v-model="form.card_flag" label="Bandeira" return-object  :items="localCardFlags" /></v-col>
      <v-col cols="12" md="3"><TextFieldMoney v-model="form.value" label="Valor" /></v-col>
    </v-row>

    <div slot="actions">
      <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded class="" @click="$emit('update:dialog', false)" />
      <Button label="Adicionar" :icon="$icons.plus" color="secondary" rounded class="ml-3" @click="payment()" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import DataPicker from '@/components/vuetify/DataPicker';
import AutoComplete from '@/components/vuetify/AutoComplete';

export default {
  name: 'DialogAddPayment',
  components: { Card, Button, TextFieldMoney, DataPicker, AutoComplete },
  props: {
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
      form: {
        payment_date: '',
        payment_method: {},
        card_flag: {},
        newItem: true,
      },
      localPaymentMethods: [],
      localCardFlags: [],
    }
  },
  mounted() {
    this.localPaymentMethods = this.payment_methods;
    this.localCardFlags = this.card_flags;
  },
  methods: {
    payment() {
      if(!this.collaborator.id) {
        this.$noty.error('Selecione o Colaborador');
        return;
      }

      this.$emit('handleActionModal', {
        action: 'addPayment',
        item: {
          ...this.serviceSelected, collaborator: { ...this.collaborator, name: this.collaborator.text } } 
      })
    }
  }
}
</script>

<style>

</style>