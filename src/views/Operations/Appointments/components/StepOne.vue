<template>
  <div class="content-appointments">
    <div class="content-appointments--boddy">
      <div class="content-appointments--boddy---left">
        <h4 class="title">Selecione o Cliente</h4>
        <img src="@/assets/ilustration-customer.png" alt="" height="200">
        <Resume :appointment="appointment" />
      </div>
      
      <div class="content-appointments--boddy---right pl-6">
        <div class="content-appointments--boddy---right----customers">
          <DataTable :headers="headers" :items="customers" :loading="loading" @getItems="getItems" @selected="selectCustomer" show-select single-select />
        </div>
      </div>
    </div>

    <div class="content-appointments--boddy---actions mt-10">
      <Button label='Cancelar' outlined color='primary' @click="$emit('setStep', 0)" />
      <Button label='Avançar' color='primary' class="ml-3" :disabled="disabledBtnNext" @click="$emit('setStep', 2)" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';
import Resume from './Resume';

export default {
  name: 'StepOne',
  components: { Button, DataTable, Resume },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    appointment: {
      type: Object,
      default: () => {},
    },
    customers: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Telefone', value: 'phone_formatted'},
        {text: 'Celular', value: 'cell_phone_formatted'},
      ],
      search: '',
      disabledBtnNext: true
    }
  },
  methods: {
    getItems(options) {
      this.$emit('getItems', { ...options, type: 'customer' });
    },
    selectCustomer(customer) {
      customer.length ? this.disabledBtnNext = false : this.disabledBtnNext = true;
      this.$emit('selectDataAppointment', { data: customer, type: 'customer' })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';

.content-appointments--boddy---right----customers {
  width: 100%;
  min-height: 330px;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 3px;

  .content-appointments--boddy---right----customers-----search-customer {
    width: 100%;
  }
}
</style>