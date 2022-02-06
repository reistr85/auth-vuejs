<template>
  <div class="content-appointments">
    <div class="content-appointments--boddy">
      <div class="content-appointments--boddy---left">
        <h4 class="title">Selecione o Cliente</h4>
        <img src="@/assets/ilustration-customer.png" alt="" height="200" v-if="height > 500">
        <Resume :appointment="appointment" />
      </div>
      
      <div class="content-appointments--boddy---right">
        <div class="content-appointments--boddy---right----data-appointment" v-if="height > 500">
          <DataTable
            ref="dataTable"
            show-select
            single-select
            :headers="headers"
            :items="customers"
            :loading="loading"
            @getItems="getItems"
            @selected="selectDataAppointment({ data: $event})" />
        </div>

        <AutoComplete
          label='Pesquise o cliente'
          item-text="name"
          item-value="id"
          avatar
          :loading="loading"
          :items="customers.data"
          @getItems="getItemsAutoComplete"
          @input="selectDataAppointment({ data: $event, autoComplete: true})" />
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
import SelectDataAppointment from '../mixins/SelectDataAppointment.js';
import BreakPointMixin from '@/mixins/BreakPointMixin';
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
      disabledBtnNext: true,
      modelAutoComplete: '',
    }
  },
  mixins: [SelectDataAppointment('customer'), BreakPointMixin],
  methods: {
    getItems(options) {
      this.$emit('getItems', { ...options, type: 'customer' });
    },
    getItemsAutoComplete(search) {
      const options = {
        search,
        autoComplete: true,
      }
      this.$emit('getItems', { ...options, type: 'customer' });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>