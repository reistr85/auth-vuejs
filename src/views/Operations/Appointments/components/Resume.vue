<template>
  <div class="content-appointments--boddy---left----resume">
    <p class="my-0 py-0"><b>Cliente: </b>{{ appointment.customer_name }}</p>
    <p class="my-0 py-0"><b>Colaborador: </b>{{ appointment.collaborator_name }}</p>
    <p class="my-0 py-0"><b>Quant. Itens: </b>{{ appointment.qtd_items }}</p>
    <p class="my-0 py-0"><b>Valor Total: </b>{{ formatCurrency(appointment.amount) }}</p>
  </div>
</template>

<script>
import { formatCurrency } from '@/utils'

export default {
  name: 'Resume',
  props: {
    appointment: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formatCurrency: formatCurrency
    }
  }
}
</script>

<style>

</style>