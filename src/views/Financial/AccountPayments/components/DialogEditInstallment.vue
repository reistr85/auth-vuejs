<template>
  <Card title="Editar Parcela">
    <div>
      <v-form class="px-0" v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" md="4">
            <TextField
              v-model="installment.description"
              label="Título"
              :rules="[rules.required]"
              :readonly="disabled"
              v-on:keyup.enter="save" />
          </v-col>
          <v-col cols="12" md="4">
            <DataPicker
              v-model="installment.date_due"
              label="Data de Vencimento"
              :readonly="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <DataPicker
              v-model="installment.date_payment"
              label="Data de Pagamento"
              :readonly="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <Select
              v-model="installment.payment_method_id"
              label="Tipo de Pagamento"
              :items="paymentMethods"
              itemText="text"
              itemValue="value"
              :readonly="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <Select
              v-model="installment.bank_id"
              label="Banco"
              :items="banks"
              itemText="text"
              itemValue="value"
              :readonly="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <TextFieldMoney
              v-model="installment.amount"
              label="Valor Parcela"
              :length="10"
              :rules="[rules.required]"
              :readonly="disabled"
              v-on:keyup.enter="save" />
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div slot="actions">
        <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded class="" @click="cancel()" />
        <Button label="Salvar" :icon="$icons.plus" color="secondary" rounded class="ml-3" @click="save(installment)" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataPicker from '@/components/vuetify/DataPicker';
import TextField from '@/components/vuetify/TextField';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import Select from '@/components/vuetify/Select';
import { required } from '@/utils/rules';

export default {
  name: 'DialogEditInstallment',
  components: {
    Card,
    Button,
    DataPicker,
    Select,
    TextField,
    TextFieldMoney
  },
  props: {
    installment: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      icons: {},
      valid: true,
      rules: {
        required: required
      },
      banks: [],
      paymentMethods: [],
    };
  },
  mounted() {
    this.getBanks();
    this.getPaymentMethods();
  },
  computed: {
    l() {
      return this.$locales.pt;
    }
  },
  methods: {
    getBanks() {
      this.$api.banks.index().then((res) => {
        this.banks = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          };
        });
      }).catch(() => {
        this.loading = false;
      });
    },
    getPaymentMethods(params = {}) {
      const payload = { ...params, filter: { type: this.$enums.typeAllType.PAYMENT_METHOD }};
      this.$api.allTypes.filters(payload).then((res) => {
        this.paymentMethods = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          };
        });
      }).catch(() => {
        this.loading = false;
      });
    },
    save(installment) {
      if (!this.$refs.form.validate()) return;
      this.$api.accountPaymentInstallments.update(installment.id, installment).then(() => {
        this.$noty.success(this.l.default.alerts.updatedRegister);
      }).catch((error) => {
        this.$noty.error(error);
      });
      this.$emit('handleActionInstallmentSave');
    },
    cancel() {
      this.$emit('update:dialog', false);
    },
  }
};
</script>

<style lang="scss" scoped>
</style>