<template>
  <Card title="Abrir Caixa">
    <div>
      <v-form class="px-0" v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" md="3">
            <DataPicker
              v-model="box.box_date"
              label="Data de Abertura"
              :disabled="disabled" />
          </v-col>
          <v-col cols="12" md="6">
            <AutoComplete 
              v-model="box.employee_id" 
              label="Funcionário Responsável" 
              :items="employees" 
              :rules="[rules.required]" />
          </v-col>
          <v-col cols="12" md="3">
            <TextFieldMoney
              v-model="box.initial_value" 
              label="Valor Inicial"
              :rules="[rules.money]"
              :length="10" />
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div slot="actions">
        <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded class="" @click="cancel()" />
        <Button label="Salvar" :icon="$icons.plus" color="secondary" rounded class="ml-3" @click="save(box)" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataPicker from '@/components/vuetify/DataPicker';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import AutoComplete from '@/components/vuetify/AutoComplete';
import BoxesService from '../services/BoxesService';
import { money, required } from '@/utils/rules';
import { mountParamsApiFilter } from '@/utils';
import { messageErrors } from '@/utils';
import locales from '@/locales/pt-BR';

export default {
  name: 'DialogOpenBox',
  components: {
    Card,
    Button,
    DataPicker,
    AutoComplete,
    TextFieldMoney
  },
  data () {
    return {
      icons: {},
      valid: true,
      disabled: true,
      rules: {
        money: money,
        required: required
      },
      expModel: [0],
      box: {},
      employees: [],
    }
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      const { options, filters } = mountParamsApiFilter({ type: 'employee' });

      this.registersService.filters(options, filters).then((res) => {
        this.employees = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          }
        })
      }).catch(() => {
        this.loading = false;
      })
    },

    save(box) {
      if(!this.$refs.form.validate()) return;

      box.total_value = box.initial_value;
      BoxesService.create(box).then((res) => {
        this.localItems = res.data;
        this.$noty.success(locales.alerts.createdRegister);
      }).catch((error) => {
        this.$noty.error(messageErrors(error));
      })
      this.$emit('handleActionModal');
    },
    cancel() {
      this.$emit('update:dialog', false)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>