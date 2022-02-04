<template>
  <div class="content-appointments">
    <div class="content-appointments--boddy">
      <div class="content-appointments--boddy---left">
        <h4 class="title">Selecione o Cliente</h4>
        <img src="@/assets/ilustration-customer.png" alt="" height="300">
      </div>
      
      <div class="content-appointments--boddy---right pl-6">
        <div class="content-appointments--boddy---right----customers">
          <TextField v-model="search" label='pesquisar cliente' class="content-appointments--boddy---right----customers-----search-customer" />
          <DataTable :headers="headers" :items="customers" hide-default-footer />
        </div>
      </div>
    </div>

    <div class="content-appointments--boddy---actions mt-10">
      <Button label='Cancelar' outlined color='primary' @click="$emit('setStep', 0)" />
      <Button label='Avançar' color='primary' class="ml-3" @click="$emit('setStep', 2)" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'StepOne',
  components: { Button, DataTable, TextField },
  props: {
    customers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Contato', value: 'phone'},
      ],
      search: '',
    }
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

  .content-appointments--boddy---right----customers-----search-customer {
    width: 100%;
  }
}
</style>