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

        <Header :calendar="$refs.calendar" :type="type" @setToday="focus = ''" @nextPrev="nextPrev"
          @update:type="type = $event" />
        <v-sheet height="600">
          <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
            :type="type" @click:event="openToolbarEvent" @click:more="viewDay" @click:date="viewDay" @change="getAppointments" />

          <ToolbarEvent v-model="selectedOpen" :selectedElement="selectedElement" :selectedEvent="selectedEvent"
            @update:selectedOpen="selectedOpen = $event" @handlerAction="handlerAction" />
        </v-sheet>
      </v-col>
    </v-row>

    <DialogConfirmation :dialog="dialog" :message="dialogMessage" @noAction="dialog = false" @yesAction="dialogAction" />
  </div>
</template>

<script>
import Header from './components/Header';
import ToolbarEvent from './components/ToolbarEvent';
import DialogConfirmation from '@/components/DialogConfirmation';

const COLORS = Object.freeze({
  pending: 'orange',
  confirmed: 'blue',
  done: 'grey',
  canceled: 'primary'
});

export default {
  name: 'MyCalendar',
  components: { Header, ToolbarEvent, DialogConfirmation },
  data() {
    return {
      focus: '',
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      dialog: false,
      dialogMessage: null,
      infoActionSelected: {},
    };
  },
  mounted () {
    this.$refs.calendar.checkChange();
  },
  computed: {
    l () {
      return this.$locales.pt.calendars.ListCalendars.myCalendar;
    },
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
    openToolbarEvent ({ nativeEvent, event }) {
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
    getAppointments () {
      this.$api.appointments.index().then((res) => {
        this.events = this.mountEvents(res.data.data);
      });
    },
    mountEvents (appointments) {
      return appointments.map((appointment) => {
        const dateInitial = this.mountDateISO(appointment.appointment_date, appointment.initial_hour);
        const dateFinal = this.mountDateISO(appointment.appointment_date, appointment.final_hour);

        return {
          id: appointment.id,
          name: appointment.customer.name,
          collaborator: appointment.collaborator.name,
          customer: appointment.customer.name,
          date:  dateInitial,
          initialHour: appointment.initial_hour,
          finalHour: appointment.final_hour,
          amount: appointment.amount,
          status: appointment.status,
          services: appointment,
          order_service_id: appointment.order_service ? appointment.order_service.id : null,
          start: dateInitial,
          end: dateFinal,
          color: COLORS[appointment.status],
          timed: false,
          displayBtnConfirmed: (appointment.status === this.$enums.appointmentStatus.PENDING) || false,
          displayBtnFinished: appointment.status === this.$enums.appointmentStatus.CONFIRMED || false,
          displayBtnCancel: (appointment.status !== this.$enums.appointmentStatus.CANCELED && appointment.status !== this.$enums.appointmentStatus.DONE) || false,
          displayBtnCreateOrderService: (appointment.status === this.$enums.appointmentStatus.DONE && !appointment.order_service) || false,
          displayBtnShowOrderService: (appointment.status === this.$enums.appointmentStatus.DONE && appointment.order_service) || false,
        };
      });
    },
    handlerAction (data) {
      const { action, event, status } = data;

      if (action === 'handlerOrderService') {
        status === 'create' ? this.openDialogCreateOrderService() : this.$router.push({ name: this.$schemas.orderService.routes.show.name, params: { id: event.order_service_id } });
      } else {
        this.dialog = true;
        this.dialogMessage = this.l.dialog[status];
        this.infoActionSelected = { action, event, status };
      }
    },
    updateAppointment (event, status) {
      this.$api.appointments.update(event.id, { status }).then(() => {
        this.changeInfoEvent(status);
        this.$noty.success(this.$locales.pt.default.alerts.success);
      }).catch(() => {
        this.$noty.error(this.$locales.pt.default.alerts.error);
      }).finally(() => {
        this.dialog = false;
        if (status === this.$enums.appointmentStatus.DONE && !event.order_service_id) this.openDialogCreateOrderService();
      });
    },
    changeInfoEvent (status) {
      this.selectedEvent.color = COLORS[status];
      this.selectedEvent.displayBtnConfirmed = (status === this.$enums.appointmentStatus.PENDING) || false;
      this.selectedEvent.displayBtnFinished = status === this.$enums.appointmentStatus.CONFIRMED || false;
      this.selectedEvent.displayBtnCancel = (status !== this.$enums.appointmentStatus.CANCELED && status !== this.$enums.appointmentStatus.DONE) || false;
      this.selectedEvent.displayBtnCreateOrderService = (status === this.$enums.appointmentStatus.DONE && !this.selectedEvent.order_service_id) || false;
      this.selectedEvent.displayBtnShowOrderService = (status === this.$enums.appointmentStatus.DONE && this.selectedEvent.order_service_id) || false;
    },
    mountDateISO (date, time) {
      const [ year, month, day ] = date.split('-');
      const [ hour, minute,  second ] = time.split(':');
      return new Date(year, (month - 1), day, hour, minute, second);
    },
    openDialogCreateOrderService () {
      this.dialog = true;
      this.dialogMessage = this.l.dialog.createOrderService;
      this.infoActionSelected = { action: 'createOrderService', event: null, status: null };
    },
    dialogAction () {
      const { action, event, status } = this.infoActionSelected;
      this[action](event, status);
    },
    createOrderService () {
      this.dialog = false;
      this.$router.push({ name: this.$schemas.orderService.routes.create.name, query: { appointment_id: this.selectedEvent.id } });
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