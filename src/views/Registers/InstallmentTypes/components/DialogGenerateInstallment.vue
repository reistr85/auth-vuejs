<template>
  <Card :title="title">
    <div>
      <v-form class="px-0" v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" md="12">
            <TextField
              v-model="installment.installment_amount"
              label="Quantidade de parcelas" />
          </v-col>
          <v-col cols="12" md="12">
            <TextField
              v-model="installment.days_first_installment"
              label="Carência da 1ª parcela" />
          </v-col>
          <v-col cols="12" md="12">
            <TextField
              v-model="installment.days_between_installment"
              label="Dias entre parcelas"
              v-on:keyup.enter="generate" />
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" md="12">
            <TextField
              v-model="installment.interval"
              label="Parcelas"
              :readonly="true" />
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div slot="actions">
      <Button label="Gerar" :icon="$icons.save" color="secondary" rounded :loading="loading" class="ml-3" @click="generate" />
      <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded :loading="loading" class="ml-3" @click="cancel()" />
      <Button label="Salvar" :icon="$icons.save" color="success" rounded :loading="loading" class="ml-3" :disabled="disabledSave" @click="save" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'DialogGenerateInstallment',
  components: {
    Card,
    Button,
    TextField
  },
  props: {
    installment: {
      type: Object,
      default: () => {
        return {
          installment_amount: 1,
          days_first_installment: 0,
          days_between_installment: 30,
          interval: '',
        };
      }
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Gerar dias entre as parcelas',
    },
    valid: {
      type: Boolean,
      default: true,
    },
    disabledSave: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      form: {},
      currentInterval: 0,
    };
  },
  methods: {
    generate() {
      this.installment.interval = '';
      if (this.installment.days_between_installment !== 0 && this.installment.installment_amount !== 0) {
        this.currentInterval = Number(this.installment.days_first_installment);
        this.installment.interval += `${this.currentInterval},`;

        for (let i = 1; i < Number(this.installment.installment_amount); i += 1) {
          this.currentInterval += Number(this.installment.days_between_installment);
          this.installment.interval += `${this.currentInterval},`;
        }
        this.installment.interval = this.installment.interval.substr(0, this.installment.interval.length - 1);
        this.disabledSave = false;
      } else {
        this.$notifyError('Preencha os valores corretamente');
      }
    },
    save() {
      // if(!this.$refs.form.validate()) return;
      this.$emit('handleActionGenerate', this.installment.interval);
    },
    cancel() {
      this.$emit('update:dialog', false);
    }
  }
};
</script>

<style>

</style>