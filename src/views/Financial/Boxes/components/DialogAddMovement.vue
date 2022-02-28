<template>
  <Card title="Adicionar Lançamento Manual">
    <div slot="content">
      <v-form class="px-0" >
        <v-row>
          <v-col cols="12" md="3">
            <DataPicker
            v-model="movement.box_movements_date"
            label="Data da Lançamento"/>
          </v-col>
          <v-col cols="12" md="3">
            <Select 
            v-model="movement.type" 
            label="Entrada / Saída" 
            :items="options.typeInputOutput" 
            itemText="text" 
            itemValue="value"
            />
          </v-col>
          <v-col cols="12" md="2">
            <TextFieldMoney
            v-model="movement.total_value" 
            label="Valor Lançamento"/>
          </v-col>
          <v-col cols="12" md="4">
            <TextField 
            v-model="movement.description" 
            label="Descrição" 
          />
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div slot="actions">
      <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded :loading="loading" class="" @click="$emit('update:dialog', false)" />
      <Button label="Salvar" :icon="$icons.save" color="success" rounded :loading="loading" class="ml-3" @click="$emit('handleActionModal', movement);" />
    </div>
  </Card>
</template>

<script>
import { typeInputOutput } from '@/utils/options';
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataPicker from '@/components/vuetify/DataPicker';
import Select from '@/components/vuetify/Select';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'DialogAddMovement',
  components: { 
    Card, 
    Button,
    DataPicker,
    Select,
    TextFieldMoney,
    TextField
  },
  props: {},
  data() {
    return {
      form: {},
      loading: false,
      movement: {
        box_movements_date: new Date().toISOString().slice(0,10),
        type: 'input',
        total_value: 0,
        description: ''
      },
      options: {
        typeInputOutput: typeInputOutput
      },
    }
  },
  save() {
  }
}
</script>

<style>

</style>