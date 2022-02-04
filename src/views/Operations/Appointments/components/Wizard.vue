<template>
  <v-stepper v-model="steps" class="content-stepper">
    <v-stepper-header>
      <v-stepper-step :complete="steps > 1" step="1">Cliente</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="steps > 2" step="2">Serviço</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="3">Data/Hora</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <StepOne @setStep="setStep" :customers="customers" :loading="loadingDataTable" @getItems="getCustomers" @selectCustomer="selectCustomer" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <StepTow @setStep="setStep" />
      </v-stepper-content>

      <v-stepper-content step="3">
        <StepThree @setStep="setStep" @finish="finish" />
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
import AppointmentsService from '../services/AppointmentsService';
import RegistersService from '@/views/Registers/Registers/services/RegistersService';

export default {
  name: 'Wizard',
  components: { StepOne, StepTow, StepThree },
  data () {
    return {
      icons: {},
      steps: 1,
      customers: {},
      loadingDataTable: false,
      appointment: {
        customer_id: 0,
        employee_id: 1,
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
    getCustomers(data = {}) {
      this.loadingDataTable = true;
      const params = { page: data.options.page, totalItemsPerPage: 5 };
      const filters = [{ name: 'type', value: 'customer' }, { name: 'name', value: data.search }];
      
      RegistersService.filters(params, filters).then((res) => {
        this.customers = res.data;
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

      if(step === 2) {
        this.appointment.customer_id = 1
      } else if(step === 2) {
        this.appointment.services = []
      }
      this.steps = step
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
    selectCustomer(customer) {
      customer.length ? this.appointment.customer_id = customer[0].id : this.appointment.customer_id = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>