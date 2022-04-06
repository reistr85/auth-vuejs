<template>
  <Row>
    <Col cols='12' md='2'>
      <DataPicker
        v-model="appointment.appointment_date"
        :label="l.date"
        :disabled='appointmentFinished' />
    </Col>
    <Col cols='12' md='2'>
      <TextFieldInteger
        v-model="appointment.appointment_number"
        :label="l.number"
        :readonly='appointmentFinished || typePage === typePageOptions.show' />
    </Col>
    <Col cols='12' md='3'>
      <AutoComplete
        v-model="appointment.collaborator_id"
        :label="l.collaborator"
        :items='collaborators'
        :readonly='appointmentFinished' />
    </Col>
    <Col cols='12' md='3'>
      <AutoComplete
        v-model="appointment.customer_id"
        :label="l.customer"
        :items='customers'
        :readonly='appointmentFinished' />
    </Col>
    <Col cols='12' md='2'>
      <TextFieldInteger
        v-model="appointment.quantity_services"
        :label="l.qtdServices"
        readonly />
    </Col>
  </Row>
</template>

<script>
import Row from '@/components/vuetify/Row';
import Col from '@/components/vuetify/Col';
import DataPicker from '@/components/vuetify/DataPicker';
import AutoComplete from '@/components/vuetify/AutoComplete';
import TextFieldInteger from '@/components/vuetify/TextFieldInteger';
import TypePageMixin from '@/mixins/TypePageMixin';

export default {
  name: 'AppointmentData',
  inject: ['appointment'],
  components: {
    Row,
    Col,
    DataPicker,
    AutoComplete,
    TextFieldInteger,
  },
  props: {
    collaborators: {
      type: Array,
      default: () => []
    },
    customers: {
      type: Array,
      default: () => []
    },
    appointmentFinished: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    l () {
      return this.$locales.pt.appointments.CreateAppointment.appointmentData;
    }
  },
  mixins: [TypePageMixin],
};
</script>

<style>

</style>