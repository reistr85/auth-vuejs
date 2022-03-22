<template>
  <div>
    <v-row class="fill-height">
      <v-col>
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
            <ToolbarEvent v-model="selectedOpen" :selectedElement="selectedElement" :selectedEvent="selectedEvent" />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from './components/Header';
import ToolbarEvent from './components/ToolbarEvent';

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
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    };
  },
  mounted () {
    this.$refs.calendar.checkChange();
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
          const [ hour, minute,  second ] = appointment.initial_hour.split(':');
          const date = new Date(year, (month - 1), day, hour, minute, second);
          
          return {
              name: `${appointment.collaborator.name} | ${appointment.customer.name}`,
              start: date,
              end: date,
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed: false,
            };
        });
      });
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style>

</style>