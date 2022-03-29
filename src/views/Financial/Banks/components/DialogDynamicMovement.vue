<template>
  <Card :title="title">
    <div>
      <v-form class="px-0" v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" md="3">
            <DataPicker
              v-model="movement.movements_date"
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
              :disabled="disabledTypeInputOutput"
              :rules="[rules.required]" />
          </v-col>
          <v-col cols="12" md="3">
            <Select
              v-model="movement.movement_type"
              label="Tipo de Movimentação"
              :items="options.typeBankMovements"
              itemText="text"
              itemValue="value"
              :rules="[rules.required]" />
          </v-col>
          <v-col cols="12" md="3">
            <TextFieldMoney
              v-model="movement.value"
              label="Valor Lançamento"
              :length="10"
              :rules="[rules.money]" />
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" md="12">
            <TextField
              v-model="movement.description"
              label="Descrição"
              :rules="[rules.required]"
              :readonly="readonlyDescription"
              v-on:keyup.enter="save" />
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
import { typeInputOutput, typeBankMovements } from '@/utils/options';
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataPicker from '@/components/vuetify/DataPicker';
import Select from '@/components/vuetify/Select';
import TextField from '@/components/vuetify/TextField';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import locales from '@/locales/pt-BR';
import { money, required } from '@/utils/rules';

export default {
  name: 'DialogDynamicMovement',
  components: {
    Card,
    Button,
    DataPicker,
    Select,
    TextField,
    TextFieldMoney
  },
  props: {
    movement: {
      type: Object,
      default: () => {
        return {
          movement: {
            bank_id: this.id,
            movements_date: null,
            type: 'input',
            movement_type: '',
            description: '',
            value: 0
          }
        };
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
        typeInputOutput: typeInputOutput,
        typeBankMovements: typeBankMovements
      },
    };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) return;
      this.movement.payment_method_id = 1;
      this.$api.bankMovements.create(this.movement).then(() => {
        this.$noty.success(locales.alerts.createdRegister);
      }).catch((error) => {
        this.$noty.error(error);
      });
      this.$emit('handleActionModal');
    },
    cancel() {
      this.$emit('update:dialog', false);
    }
  }
};
</script>

<style>

</style>