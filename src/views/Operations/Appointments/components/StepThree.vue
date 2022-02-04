<template>
  <div class="content-appointments">
    <div class="content-appointments">
      <div class="content-appointments--boddy">
        <div class="content-appointments--boddy---left">
          <h4 class="title">Escolha a Data e Hora</h4>
          <img src="@/assets/ilustration-data-time.png" alt="" height="300">
        </div>
        
        <div class="content-appointments--boddy---right">
          <v-date-picker v-model="date" v-if="!dateSelected" @input="selectDate"></v-date-picker>
          <v-time-picker v-model="hour" v-else :allowed-minutes="allowedStep" format="24hr" @input="selectHour"></v-time-picker>
        </div>
      </div>

      <div class="content-appointments--boddy---actions mt-10">
        <Button label='Voltar' outlined color='primary' @click="setStep" />
        <Button label='Ver agenda' :icon="icons.calendar" color='secondary' class="ml-3" @click="$emit('openCalendar', {})" />
        <Button label='Concluir' :disabled="!hourSelected" color='primary' class="ml-3" @click="finish" />
      </div>
    </div>
  </div>
</template>

<script>
import { calendar } from '@/utils/icons';
import Button from '@/components/vuetify/Button';

export default {
  name: 'StepThree',
  components: { Button },
  props: {},
  data() {
    return {
      icons: {
        calendar: calendar,
      },
      date: null,
      hour: null,
      dateSelected: false,
      hourSelected: false,
    }
  },
  computed: {
    allowedStep() {
      return m => m % 30 === 0
    },
  },
  methods: {
    selectDate() {
      this.dateSelected = true;
    },
    selectHour() {
      this.hourSelected = true;
    },
    setStep() {
      this.reset();
      this.$emit('setStep', 2);
    },
    finish() {
      this.$emit('finish', { 
        date_initial: `${this.date} ${this.hour}:00`,
        date_final: `${this.date} ${this.hour}:00`,
      })
      this.reset();
    },
    reset() {
      this.date = null;
      this.hour = null;
      this.dateSelected = false;
      this.hourSelected = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>