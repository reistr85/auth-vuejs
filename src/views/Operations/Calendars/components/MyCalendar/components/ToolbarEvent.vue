<template>
  <v-menu v-bind="$attrs" :close-on-content-click="false" :activator="selectedElement" offset-x>
    <Card :color="selectedEvent.color" title="1" min-width="350px" toolbar icon dark>
      <template slot="toolbar">
        <h3 v-html="selectedEvent.name"></h3>
      </template>

      <template>
        <p><span class="font-weight-black">{{ l.titles.collaborator }}:</span> {{ selectedEvent.collaborator }}</p>
        <p><span class="font-weight-black">{{ l.titles.customer }}:</span> {{ selectedEvent.customer }}</p>
        <p><span class="font-weight-black">{{ l.titles.date }}:</span> {{ date }}</p>
        <p><span class="font-weight-black">{{ l.titles.hour }}:</span> {{ hours }}</p>
        <p><span class="font-weight-black">{{ l.titles.services }}:</span> {{ selectedEvent.customer }}</p>
        <p><span class="font-weight-black">{{ l.titles.amount }}:</span> {{ amount }}</p>
        <p class="d-flex"><span class="font-weight-black mr-3">Status:</span> <Chip :label="status.label" :color="status.color" dark /></p>
      </template>

      <template class="mt-10">
        <Button :label="l.buttons.confirmed" v-if="selectedEvent.displayBtnConfirmed" small color="success" class="mr-2" />
        <Button :label="l.buttons.finish" v-if="selectedEvent.displayBtnFinished" dark small color="blue" class="mr-2" />
        <Button :label="l.buttons.cancel" v-if="selectedEvent.displayBtnCancel" small color="primary" />
      </template>
    </Card>
  </v-menu>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import Chip from '@/components/vuetify/Chip';
import { formatCurrency } from '@/utils';

const STATUS_COLOR = Object.freeze({
  pending: 'warning',
  confirmed: 'blue',
  done: 'gray',
  canceled: 'red',
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
      return this.$locales.pt.calendars.ListCalendars.myCalendar.toolbarEve;
    },
    lOrderServices () {
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
      return {
        label: this.lOrderServices.listOrderServices.status[this.selectedEvent.status],
        color: STATUS_COLOR[this.selectedEvent.status]
      };
    },
  }
};
</script>

<style>

</style>