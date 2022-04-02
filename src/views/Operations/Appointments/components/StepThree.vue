<template>
  <div class="content-appointments">
    <div class="content-appointments--boddy">
      <div class="content-appointments--boddy---left">
        <h4 class="title">Selecione o Serviço</h4>
        <img src="@/assets/ilustration-service.png" alt="" height="200">
        <AutoComplete
            label='Pesquise o serviço'
            item-text="name"
            item-value="id"
            item-sub-text="sale_value_formatted"
            avatar
            multiple
            class="content-appointments--boddy---left----auto-complete-appointments"
            :loading="loading"
            :items="services.data"
            @getItems="getItemsAutoComplete"
            @input="selectDataAppointment({ data: $event, autoComplete: true})" />
        <Resume :appointment="appointment" />
      </div>

      <div class="content-appointments--boddy---right">
        <div class="content-appointments--boddy---right----data-appointment">
          <DataTable
            ref="dataTable"
            show-select
            class="content-appointments--boddy---right----data-appointment-----data-table-appointments"
            :headers="headers"
            :items="services"
            :loading="loading"
            @getItems="getItems"
            @selected="selectDataAppointment({ data: $event })" />
        </div>
      </div>
    </div>

    <div class="content-appointments--actions">
      <Button label='Cancelar' outlined color='primary' @click="$emit('setStep', 0)" />
      <Button label='Voltar' color='secondary' @click="$emit('setStep', 2)" />
      <Button label='Avançar' color='primary' :disabled="disabledBtnNext" @click="$emit('setStep', 4)" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';
import Resume from './Resume';
import SelectDataAppointment from '../mixins/SelectDataAppointment.js';
import AutoComplete from '@/components/vuetify/AutoComplete';

export default {
  name: 'StepThree',
  components: { Button, DataTable, Resume, AutoComplete },
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
    };
  },
  mixins: [SelectDataAppointment('service')],
  methods: {
    getItems(options) {
      this.$emit('getItems', { ...options, type: 'service' });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>