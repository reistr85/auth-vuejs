<template>
  <v-row>
    <v-col cols="12" md="2">
      <DataPicker 
        v-model="orderService.order_date" 
        label="Data da Ordem"
        :disabled="orderFinished" />
    </v-col>
    <v-col cols="12" md="4">
      <AutoComplete
        v-model="orderService.collaborator_id"
        label="Colaborador"
        :items="collaborators"
        :readonly="orderFinished" />
    </v-col>
    <v-col cols="12" md="4">
      <AutoComplete
        v-model="orderService.customer_id"
        label="Cliente"
        :items="customers"
        :readonly="orderFinished" />
    </v-col>
    <v-col cols="12" md="2">
      <TextFieldInteger
        v-model="orderService.quantity_services"
        label="Quant. Itens"
        readonly />
    </v-col>
  </v-row>
</template>

<script>
import DataPicker from '@/components/vuetify/DataPicker';
import AutoComplete from '@/components/vuetify/AutoComplete';
import TextFieldInteger from '@/components/vuetify/TextFieldInteger';

export default {
  name: 'OrderData',
  components: {
    DataPicker,
    AutoComplete,
    TextFieldInteger,
  },
  props: {
    orderService: {
      type: Object,
      default: () => {}
    },
    collaborators: {
      type: Array,
      default: () => []
    },
    customers: {
      type: Array,
      default: () => []
    },
    orderFinished: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style>

</style>