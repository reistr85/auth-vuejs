<template>
  <v-stepper v-model="steps" class="content-stepper">
    <v-stepper-header>
      <v-stepper-step :complete="steps > 1" step="1">Cliente</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="steps > 2" step="2">Colaborador</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="steps > 3" step="3">Serviço</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="4">Data/Hora</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <StepOne
          ref="stepOne"
          :appointment="appointment"
          :customers="customers"
          :loading="loadingDataTable"
          @setStep="setStep"
          @getItems="getRegisters"
          @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <StepTow
          ref="stepTow"
          :appointment="appointment"
          :collaborators="collaborators"
          :loading="loadingDataTable"
          @setStep="setStep"
          @getItems="getRegisters"
          @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="3">
        <StepThree
          ref="stepThree"
          :appointment="appointment"
          :services="services"
          :loading="loadingDataTable"
          @setStep="setStep"
          @getItems="getServices"
          @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="4">
        <StepFour
          :appointment="appointment"
          @setStep="setStep"
          @setDate="setDate"
          @setHour="setHour"
          @finish="finish" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { appointmentStatus } from '@/utils/enums';
import { messageErrors } from '@/utils';
import locales from '@/locales/pt-BR';
import StepOne from './StepOne';
import StepTow from './StepTow';
import StepThree from './StepThree';
import StepFour from './StepFour';
import AppointmentsService from '../services/AppointmentsService';
import RegistersService from '@/views/Registers/Registers/services/RegistersService';
import ServicesService from '@/views/Registers/Services/services/ServicesService';

export default {
  name: 'Wizard',
  components: { StepOne, StepTow, StepThree, StepFour },
  data () {
    return {
      icons: {},
      steps: 1,
      customers: {},
      collaborators: {},
      services: {},
      loadingDataTable: false,
      appointment: {
        customer_id: 0,
        customer_name: '',
        collaborator_id: 0,
        collaborator_name: '',
        appointment_date: null,
        initial_hour: null,
        final_hour: null,
        description: null,
        amount: 0,
        qtd_items: 0,
        services: [],
        status: appointmentStatus.PENDING,
      }
    }
  },
  methods: {
    getRegisters(data) {
      this.loadingDataTable = true;
      const filters = [{ name: 'type', value: data.type }, { name: 'name', value: data.search }];
      
      RegistersService.filters(this.setParams(data), filters).then((res) => {
        data.type === 'customer' ? this.customers = res.data : this.collaborators = res.data;
        this.loadingDataTable = false;
      }).catch(() => {
        this.loadingDataTable = false;
      })
    },
    getServices(data) {
      this.loadingDataTable = true;
      const filters = [{ name: 'name', value: data.search }];
      
      ServicesService.filters(this.setParams(data), filters).then((res) => {
        this.services = res.data;
        this.loadingDataTable = false;
      }).catch(() => {
        this.loadingDataTable = false;
      })
    },
    setStep(step) {
      if(step === 0) {
        this.steps = 1;
        this.$refs.stepOne.$refs.dataTable.selected = []
        this.$refs.stepTow.$refs.dataTable.selected = []
        this.$refs.stepThree.$refs.dataTable.selected = []
        this.$emit('cancel');
        return;
      }

      this.steps = step
    },
    selectDataAppointment(params) {
      const { data, type } = params;
      if(type === 'customer' || type === 'collaborator') {
        this.appointment[`${type}_id`] = data.length ? data[0].id : 0;
        this.appointment[`${type}_name`] = data.length ? data[0].name : '';
      }else if(type === 'service'){
        let amount = 0;
        this.appointment.services = data.map((item) => {
          amount += parseFloat(item.sale_value)
          return { id: item.id }
        });

        this.appointment.amount = amount;
        this.appointment.qtd_items = this.appointment.services.length;
      }
    },
    setDate(date) {
      this.appointment.appointment_date = date;
    },
    setHour(data) {
      this.appointment.initial_hour = data.initialHour;
      this.appointment.final_hour = data.finalHour;
    },
    setParams(data) {
      return { page: data.options?.page || 1, totalItemsPerPage: 5 }
    },
    finish() {
      AppointmentsService.create(this.appointment).then(() => {
        this.resetAppointment();
        this.setStep(0)
        this.$noty.success(locales.alerts.createdRegister);
      }).catch((err) => {
        this.$noty.error(messageErrors(err));
      })
    },
    resetAppointment() {
      this.steps = 1;
      this.appointment = {
        customer_id: 0,
        customer_name: '',
        collaborator_id: 0,
        collaborator_name: '',
        appointment_date: null,
        initial_hour: null,
        final_hour: null,
        description: null,
        amount: 0,
        qtd_items: 0,
        services: [],
        status: appointmentStatus.PENDING,
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>