<template>
  <div class="content-appointments">
    <div class="content-appointments">
      <div class="content-appointments--boddy">
        <div class="content-appointments--boddy---left">
          <h4 class="title">Escolha a Data e Hora</h4>
          <img src="@/assets/ilustration-data-time.png" alt="" height="200">
          <Resume :appointment="appointment" />
        </div>
        
        <div class="content-appointments--boddy---right calendar-hour">
          <div class="content-appointments--boddy---right----date-time">
            <v-date-picker v-model="date" v-if="!dateSelected" @input="selectDate"></v-date-picker>

            <div v-else class="content-appointments--boddy---right----date-time-----hour">
              <div >
                <h3 class="text-center">Hora Início</h3>
                <h4 class="text-center">{{ initialHour || '00:00' }}</h4>
                <v-time-picker
                  ref="dataPickerInitial"
                  v-model="initialHour"
                  no-title
                  format="24hr"
                  :allowed-minutes="allowedStep"
                  @input="selectHour('initial')" />
              </div>

              <div>
                <h3 class="text-center">Hora Final</h3>
                <h4 class="text-center">{{ finalHour || '00:00' }}</h4>
                <v-time-picker
                  ref="dataPickerFinal"
                  v-model="finalHour"
                  no-title
                  format="24hr"
                  :disabled="!initialHourSelected"
                  :allowed-minutes="allowedStep"
                  @input="selectHour('final')" />
              </div>
            </div>

            <div class="content-appointments--boddy---right----date-time-----actions" v-if="dateSelected">
              <Button class="mr-2" label='Alterar Data' color='primary' small @click="reset" />
              <Button class="ml-2" label='Resetar Hora' color='secondary' small @click="resetHour" />
            </div>
          </div>
        </div>
      </div>

      <div class="content-appointments--actions">
        <Button label='Cancelar' outlined color='primary' @click="$emit('setStep', 0)" />
        <Button label='Voltar' color='secondary' @click="setStep" />
        <Button label='Ver agenda' :icon="icons.calendar" color='orange' @click="$emit('openCalendar', {})" />
        <Button label='Concluir' :disabled="!finalHourSelected" color='primary' @click="finish" />
      </div>
    </div>
  </div>
</template>

<script>
import { calendar } from '@/utils/icons';
import Button from '@/components/vuetify/Button';
import Resume from './Resume';

export default {
  name: 'StepFour',
  components: { Button, Resume },
  props: {
    appointment: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      icons: {
        calendar: calendar,
      },
      date: null,
      initialHour: null,
      finalHour: null,
      dateSelected: false,
      initialHourSelected: false,
      finalHourSelected: false,
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
      this.$emit('setDate', this.date)
    },
    selectHour(type) {
      if(type === 'initial') {
        const hour = this.initialHour.split(':')
        this.initialHourSelected = true;
        hour[1] === '00' ? this.finalHour = `${hour[0]}:30` : this.finalHour = `${parseInt(hour[0]) + 1}:00`
      }

      this.finalHourSelected = true;
      this.$emit('setHour', { initialHour: this.initialHour, finalHour: this.finalHour })
    },
    setStep() {
      this.reset();
      this.$emit('setStep', 3);
    },
    finish() {
      this.$emit('finish')
      this.reset();
    },
    reset() {
      this.date = null;
      this.dateSelected = false;
      this.resetHour();
    },
    resetHour() {
      if(this.$refs.dataPickerInitial) {
        this.$refs.dataPickerInitial.selecting = 1
        this.$refs.dataPickerFinal.selecting = 1
      }

      this.initialHour = null;
      this.finalHour = null;
      this.initialHourSelected = false;
      this.finalHourSelected = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';

.v-picker__title {
  padding: 5px !important;
}
</style>