<template>
  <Card :title="title">
    <div>
      <v-form class="px-0" v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" md="3">
            <DataPicker
              v-model="movement.box_movements_date"
              label="Data da Lançamento"
              :disabled="disabledDate" />
          </v-col>
          <v-col cols="12" md="3">
            <Select 
              v-model="movement.type" 
              label="Entrada / Saída" 
              :items="options.typeInputOutput" 
              itemText="text" 
              itemValue="value"
              :disabled="disabledTypeInputOutput" />
          </v-col>
          <v-col cols="12" md="2">
            <TextFieldMoney
              v-model="movement.total_value" 
              label="Valor Lançamento"
              :length="10"
              :rules="[rules.money]" />
          </v-col>
          <v-col cols="12" md="4">
            <TextField 
              v-model="movement.description" 
              label="Descrição" 
              :rules="[rules.required]"
              :readonly="readonlyDescription"
              v-on:keyup.enter="save()" />
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div slot="actions">
      <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded :loading="loading" class="" @click="cancel()" />
      <Button label="Salvar" :icon="$icons.save" color="success" rounded :loading="loading" class="ml-3" @click="save" />
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
import BoxMovementsService from '../services/BoxMovementsService';
import { messageErrors } from '@/utils';
import locales from '@/locales/pt-BR';
import { money, required } from '@/utils/rules';

export default {
  name: 'DialogDynamicMovement',
  components: { 
    Card, 
    Button,
    DataPicker,
    Select,
    TextFieldMoney,
    TextField
  },
  props: {
    movement: {
      type: Object,
      default: () => {
        return {
          movement: {
            box_id: this.id,
            box_movements_date: null,
            type: 'output',
            total_value: 0,
            description: ''
          }
        }
      }
    },
    disabledDate: {
      type: Boolean,
      default: false,
    },
    disabledTypeInputOutput: {
      type: Boolean,
      default: false,
    },
    readonlyDescription: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    valid: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      form: {},
      rules: {
        money: money,
        required: required
      },
      options: {
        typeInputOutput: typeInputOutput
      },
    }
  },
  methods: {
    save() {
      if(!this.$refs.form.validate())
        return;
      
      this.movement.payment_method_id = 1;
      BoxMovementsService.create(this.movement).then(() => {
        this.$noty.success(locales.alerts.createdRegister);
      }).catch((error) => {
        this.$noty.error(messageErrors(error));
      })
      this.$emit('handleActionModal');
    },
    cancel() {
      this.$emit('update:dialog', false)
    }
  }
  
}
</script>

<style>

</style>