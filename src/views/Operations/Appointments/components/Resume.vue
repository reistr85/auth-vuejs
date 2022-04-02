<template>
  <div class="content-appointments--boddy---left----resume">
    <p class="my-0 py-0"><b>Cliente: </b>{{ appointment.customer_name }}</p>
    <p class="my-0 py-0"><b>Colaborador: </b>{{ appointment.collaborator_name }}</p>
    <p class="my-0 py-0"><b>Quant. Itens: </b>{{ appointment.qtd_items }}</p>
    <p class="my-0 py-0"><b>Valor Total: </b>{{ amount }}</p>

    <div class="d-flex justify-space-between">
      <p class="my-0 py-0"><b>Data: </b>{{ date || '00/00/00' }}</p>
      <p class="my-0 py-0"><b>Início: </b>{{ appointment.initial_hour || '00:00' }}</p>
      <p class="my-0 py-0"><b>Fim: </b>{{ appointment.final_hour || '00:00' }}</p>
    </div>
  </div>
</template>

<script>
import { formatCurrency, formatDate } from '@/utils';

export default {
  name: 'Resume',
  props: {
    appointment: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    amount() {
      return formatCurrency(this.appointment.amount);
    },
    date() {
      return formatDate(this.appointment.appointment_date);
    }
  }
};
</script>

<style>

</style>