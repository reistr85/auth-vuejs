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
        <StepOne @setStep="setStep" :customers="customers" :loading="loadingDataTable" @getItems="getRegisters" @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <StepTow @setStep="setStep" :collaborators="collaborators" :loading="loadingDataTable" @getItems="getRegisters" @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="3">
        <StepThree @setStep="setStep" :services="services" :loading="loadingDataTable" @getItems="getServices" @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="4">
        <StepFour @setStep="setStep" @finish="finish" />
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
        collaborator_id: 0,
        services: [],
        appointment_number: 0,
        date_initial: null,
        date_final: null,
        description: null,
        status: appointmentStatus.PENDING,
      }
    }
  },
  methods: {
    getRegisters(data = {}) {
      this.loadingDataTable = true;
      const params = { page: data.options.page, totalItemsPerPage: 5 };
      const filters = [{ name: 'type', value: data.type }, { name: 'name', value: data.search }];
      
      RegistersService.filters(params, filters).then((res) => {
        data.type === 'customer' ? this.customers = res.data : this.collaborators = res.data;
        this.loadingDataTable = false;
      }).catch(() => {
        this.loadingDataTable = false;
      })
    },
    getServices(data = {}) {
      this.loadingDataTable = true;
      const params = { page: data.options.page, totalItemsPerPage: 5 };
      
      ServicesService.index(params).then((res) => {
        this.services = res.data;
        this.loadingDataTable = false;
      }).catch(() => {
        this.loadingDataTable = false;
      })
    },
    setStep(step) {
      if(step === 0) {
        this.$emit('cancel');
        return;
      }

      this.steps = step
    },
    selectDataAppointment(params) {
      const { data, type } = params;
      if(type === 'customer') {
        data.length ? this.appointment.customer_id = data[0].id : this.appointment.customer_id = 0;
      }else if(type === 'collaborator'){
        data.length ? this.appointment.collaborator_id = data[0].id : this.appointment.collaborator_id = 0;
      }else if(type === 'service'){
        // if(data.length) {
        //   data;
        // }
        this.appointment.services = data.map((item) => {
          return { id: item.id }
        });
        // data.length ? this.appointment.collaborator_id = data[0].id : this.appointment.collaborator_id = 0;
      }
    },
    finish(data) {
      const { date_initial, date_final } = data;
      this.appointment.date_initial = date_initial;
      this.appointment.date_final = date_final;

      AppointmentsService.create(this.appointment).then(() => {
        this.$noty.success(locales.alerts.createdRegister);
      }).catch((err) => {
        this.$noty.error(messageErrors(err));
      })

      this.$emit('cancel');
      this.resetAppointment();
    },
    resetAppointment() {
      this.steps = 1;
      this.appointment = {
        customer_id: 0,
        employee_id: 0,
        services: [],
        appointment_number: 0,
        date_initial: null,
        date_final: null,
        description: null,
        status: appointmentStatus.PENDING,
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>