<template>
  <div class="content-appointments">
    <div class="content-appointments--boddy">
      <div class="content-appointments--boddy---left">
        <h4 class="title">Selecione o Colaborador</h4>
        <img src="@/assets/ilustration-collaborator.png" alt="" height="200">
        <AutoComplete
            label='Pesquise o colaborador'
            item-text="name"
            item-value="id"
            item-sub-text="cell_phone_formatted"
            avatar
            class="content-appointments--boddy---left----auto-complete-appointments"
            :loading="loading"
            :items="collaborators.data"
            @getItems="getItemsAutoComplete"
            @input="selectDataAppointment({ data: $event, autoComplete: true})" />
        <Resume :appointment="appointment" />
      </div>
      
      <div class="content-appointments--boddy---right">
        <div class="content-appointments--boddy---right----data-appointment">
          <DataTable
            ref="dataTable"
            show-select
            single-select
            class="content-appointments--boddy---right----data-appointment-----data-table-appointments"
            :headers="headers"
            :items="collaborators"
            :loading="loading"
            @getItems="getItems"
            @selected="selectDataAppointment({ data: $event})" />
        </div>
      </div>
    </div>

    <div class="content-appointments--actions">
      <Button label='Cancelar' outlined color='primary' @click="$emit('setStep', 0)" />
      <Button label='Voltar' color='secondary' @click="$emit('setStep', 1)" />
      <Button label='Avançar' color='primary' :disabled="disabledBtnNext" @click="$emit('setStep', 3)" />
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
  name: 'StepOne',
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
    collaborators: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Contato', value: 'cell_phone_formatted'},
      ],
      search: '',
      disabledBtnNext: true,
    }
  },
  mixins: [SelectDataAppointment('collaborator')],
  methods: {
    getItems(options) {
      this.$emit('getItems', { ...options, type: 'collaborator' });
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>