<template>
  <div class="content-appointments">
    <div class="content-appointments--boddy">
      <div class="content-appointments--boddy---left">
        <h4 class="title">Selecione o Serviço</h4>
        <img src="@/assets/ilustration-service.png" alt="" height="200">
        <Resume :appointment="appointment" />
      </div>
      
      <div class="content-appointments--boddy---right pl-6">
        <div class="content-appointments--boddy---right----services">
          <DataTable
            ref="dataTable"
            show-select
            :headers="headers"
            :items="services"
            :loading="loading"
            @getItems="getItems"
            @selected="selectDataAppointment" />
        </div>
      </div>
    </div>

    <div class="content-appointments--boddy---actions mt-10">
      <Button label='Cancelar' outlined color='primary' @click="$emit('setStep', 0)" />
      <Button label='Voltar' color='secondary' class="ml-3" @click="$emit('setStep', 2)" />
      <Button label='Avançar' color='primary' class="ml-3" :disabled="disabledBtnNext" @click="$emit('setStep', 4)" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';
import Resume from './Resume';
import SelectDataAppointment from '../mixins/SelectDataAppointment.js';

export default {
  name: 'StepThree',
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
    services: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Valor', value: 'sale_value_formatted'},
      ],
      search: '',
      disabledBtnNext: true
    }
  },
  mixins: [SelectDataAppointment('service')],
  methods: {
    getItems(options) {
      this.$emit('getItems', { ...options, type: 'service' });
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';

.content-appointments--boddy---right----services {
  width: 100%;
  min-height: 330px;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 3px;

  .content-appointments--boddy---right----services-----search-customer {
    width: 100%;
  }
}
</style>