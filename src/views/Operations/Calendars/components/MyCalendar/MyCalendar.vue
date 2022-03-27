<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <template>
          <div class="d-flex">
            <div v-for="(legend, index) in legends" :key="index" class="mr-5">
              <span :class="['box-legend', legend.color]"></span> {{ legend.label }}
            </div>
          </div>
        </template>

        <Header
          :calendar="$refs.calendar"
          :type="type"
          @setToday="focus = ''"
          @nextPrev="nextPrev"
          @update:type="type = $event" />

        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange" />

          <ToolbarEvent
            v-model="selectedOpen"
            :selectedElement="selectedElement"
            :selectedEvent="selectedEvent"
            @update:selectedOpen="selectedOpen = $event"
            @handlerAction="handlerAction" />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from './components/Header';
import ToolbarEvent from './components/ToolbarEvent';

const COLORS = Object.freeze({
  pending: 'orange',
  confirmed: 'blue',
  done: 'grey',
  canceled: 'primary'
});

export default {
  name: 'MyCalendar',
  components: { Header, ToolbarEvent },
  data() {
    return {
      focus: '',
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
    };
  },
  mounted () {
    this.$refs.calendar.checkChange();
  },
  computed: {
    lAppointments () {
      return this.$locales.pt.appointments;
    },
    legends () {
      return Object.keys(COLORS).map((color) => {
        return {
          label: this.lAppointments.ListAppointments.status[color],
          color: COLORS[color]
        };
      });
    }
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor (event) {
      return event.color;
    },
    nextPrev(type) {
      this.$refs.calendar[type]();
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true));
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange ({ start, end }) {
      start;
      end;
      this.$api.appointments.index().then((res) => {
        this.events = res.data.data.map((appointment) => {
          const [ year, month, day ] = appointment.appointment_date.split('-');
          const [ initialHour, initialMinute,  initialSecond ] = appointment.initial_hour.split(':');
          const [ finalHour, finalMinute,  finalSecond ] = appointment.final_hour.split(':');
          const dateInitial = new Date(year, (month - 1), day, initialHour, initialMinute, initialSecond);
          const dateFinal = new Date(year, (month - 1), day, finalHour, finalMinute, finalSecond);
          return {
            id: appointment.id,
            name: `${appointment.collaborator.name} | ${appointment.customer.name}`,
            collaborator: appointment.collaborator.name,
            customer: appointment.customer.name,
            date:  dateInitial,
            initialHour: `${initialHour}:${initialMinute}`,
            finalHour: `${finalHour}:${finalMinute}`,
            amount: appointment.amount,
            status: appointment.status,
            services: appointment,
            start: dateInitial,
            end: dateFinal,
            color: COLORS[appointment.status],
            timed: false,
            displayBtnConfirmed: (appointment.status === this.$enums.appointmentStatus.PENDING) || false,
            displayBtnFinished: appointment.status === this.$enums.appointmentStatus.CONFIRMED || false,
            displayBtnCancel: appointment.status !== this.$enums.appointmentStatus.CANCELED || false,
          };
        });
      });
    },
    handlerAction (data) {
      const { action, event, status } = data;
      this[action](event, status);
    },
    updateAppointment (event, status) {
      this.selectedOpen = false;
      this.selectedEvent.color = COLORS[status];

      this.$api.appointments.update(event.id, { status }).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.success);
      }).catch(() => {
        this.$noty.error(this.$locales.pt.default.alerts.error);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.box-legend {
  display: inline-block;
  width: 10px;
  height: 10px;
}
</style>