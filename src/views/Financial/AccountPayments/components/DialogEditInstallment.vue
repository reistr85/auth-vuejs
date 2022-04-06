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
          <v-col cols="12" md="3">
            <Select
              v-model="installment.bank_id"
              label="Banco"
              :items="banks"
              itemText="text"
              itemValue="value"
              :readonly="disabledBank"
              @change="changeBank()" />
          </v-col>
          <v-col cols="12" md="2">
            <VSwitch :label="boxLocal.label" v-model="boxLocal.value"  class="mt-1 mr-3" @click="setBox()" />
          </v-col>
          <v-col cols="12" md="3">
            <TextFieldMoney v-model="installment.amount" label="Valor Parcela" :length="10" :rules="[rules.required]" :readonly="disabled" v-on:keyup.enter="save" />
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div slot="actions">
        <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded class="" @click="$emit('update:dialog', false)" />
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
import VSwitch from '@/components/vuetify/VSwitch';
import { required } from '@/utils/rules';

export default {
  name: 'DialogEditInstallment',
  components: {
    Card,
    Button,
    DataPicker,
    Select,
    TextField,
    TextFieldMoney,
    VSwitch
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
      disabledBank: false,
      boxLocal: {
        label: 'Usar Caixa',
        value: false
      }
    };
  },
  mounted() {
    this.boxLocal.value = this.installment.box;
    this.getBanks();
    this.getPaymentMethods();
  },
  watch: {
    ['installment.box']: {
      handler() {
        console.log(this.installment);
        this.boxLocal.value = this.installment.box;
      },
      deep: true
    }
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
      installment.box = this.boxLocal.value == true ? this.$enums.typeYesNo.YES : this.$enums.typeYesNo.NO;
      this.$api.accountPaymentInstallments.update(installment.id, installment).then(() => {
      }).catch((error) => {
        this.$noty.error(error);
      }).finally(() => {
        this.$emit('handleActionInstallmentSave');
      });
    },
    setBox() {
      this.installment.box = !this.installment.box;
      if (this.installment.box) {
        this.installment.bank_id = null; this.disabledBank = true;
      } else {
        this.disabledBank = false;
      }
    },
    changeBank() {
      if (this.installment.box) {
        this.installment.box = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>