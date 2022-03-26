<template>
  <v-menu v-bind="$attrs" :close-on-content-click="false" :activator="selectedElement" offset-x>
    <Card :color="selectedEvent.color" title="1" min-width="350px" toolbar icon dark>
      <template slot="toolbar">
        <h3 v-html="selectedEvent.name"></h3>
      </template>

      <div>
        <p><span class="font-weight-black">Colaborador:</span> {{ selectedEvent.collaborator }}</p>
        <p><span class="font-weight-black">Cliente:</span> {{ selectedEvent.customer }}</p>
        <p><span class="font-weight-black">Data:</span> {{ date }}</p>
        <p><span class="font-weight-black">Hora:</span> {{ hours }}</p>
        <p><span class="font-weight-black">Serviço(s):</span> {{ selectedEvent.customer }}</p>
        <p><span class="font-weight-black">Valor:</span> {{ amount }}</p>
        <p class="d-flex"><span class="font-weight-black mr-3">Status:</span> <Chip :label="status.label" :color="status.color" /></p>
      </div>

      <div class="mt-10">
        <Button label="Confirmar" small color="success" />
        <Button label="Finalizar" small color="blue" dark class="mx-2" />
        <Button label="Cancelar" small color="primary" />
      </div>
    </Card>
  </v-menu>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import Chip from '@/components/vuetify/Chip';
import { formatCurrency } from '@/utils';

const STATUS_COLOR = Object.freeze({
  pending: 'warning'
});

export default {
  name: 'ToolbarEvent',
  components: { Card, Button, Chip },
  props: {
    selectedElement: {
      required: true
    },
    selectedEvent: {
      required: true
    }
  },
  computed: {
    l () {
      return this.$locales.pt.orderServices;
    },
    date() {
      return `${this.selectedEvent.date?.getDate()}/${this.selectedEvent.date?.getMonth()}/${this.selectedEvent.date?.getFullYear()}`;
    },
    hours() {
      return `${this.selectedEvent.initialHour} às ${this.selectedEvent.finalHour}`;
    },
    amount () {
      return formatCurrency(this.selectedEvent.amount);
    },
    status () {
      return { label: this.l.listOrderServices.status[this.selectedEvent.status], color: STATUS_COLOR[this.selectedEvent.status] };
    }
  }
};
</script>

<style>

</style>