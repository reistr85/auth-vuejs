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
          :appointment="appointment"
          :customers="customers"
          :loading="loadingDataTable"
          @setStep="setStep"
          @getItems="getRegisters"
          @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <StepTow
          :appointment="appointment"
          :collaborators="collaborators"
          :loading="loadingDataTable"
          @setStep="setStep"
          @getItems="getRegisters"
          @selectDataAppointment="selectDataAppointment" />
      </v-stepper-content>

      <v-stepper-content step="3">
        <StepThree
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
      steps: 4,
      customers: {},
      collaborators: {},
      services: {},
      loadingDataTable: false,
      appointment: {
        customer_id: 0,
        customer_name: '',
        collaborator_id: 0,
        collaborator_name: '',
        appointment_number: 0,
        date: null,
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
        if(data.length) {
          this.appointment.customer_id = data[0].id;
          this.appointment.customer_name = data[0].name;
        }else{
          this.appointment.customer_id = 0;
          this.appointment.customer_name = '';
        }
      }else if(type === 'collaborator'){
        if(data.length) {
          this.appointment.collaborator_id = data[0].id;
          this.appointment.collaborator_name = data[0].name;
        }else{
          this.appointment.collaborator_id = 0;
          this.appointment.collaboratorr_name = '';
        }
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
      this.appointment.date = date;
    },
    setHour(data) {
      this.appointment.initial_hour = data.initialHour;
      this.appointment.final_hour = data.finalHour;
    },
    finish() {
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
        customer_name: '',
        collaborator_id: 0,
        collaborator_name: '',
        appointment_number: 0,
        date: null,
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