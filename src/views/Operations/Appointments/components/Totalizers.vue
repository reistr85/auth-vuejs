<template>
  <Row>
    <Col cols="12" md="4"><TextFieldMoney v-model="appointment.subtotal" :label="l.subtotal" readonly /></Col>
    <Col cols="12" md="4"><TextFieldMoney v-model="appointment.discount" :label="l.discount" readonly /></Col>
    <Col cols="12" md="4"><TextFieldMoney v-model="appointment.amount" :label="l.amount" readonly /></Col>
  </Row>
</template>

<script>
import Row from '@/components/vuetify/Row';
import Col from '@/components/vuetify/Col';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';

export default {
  name: 'Totalizers',
  inject: ['appointment'],
  components: { Row, Col, TextFieldMoney },
  computed: {
    l () {
      return this.$locales.pt.appointments.CreateAppointment.totalizers;
    }
  }
};
</script>

<style>

</style>