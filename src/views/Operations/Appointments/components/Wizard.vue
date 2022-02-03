<template>
  <v-stepper v-model="steps" class="content-stepper">
    <v-stepper-header>
      <v-stepper-step :complete="steps > 1" step="1">Cliente</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="steps > 2" step="2">Serviço</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="3">Data/Hora</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="content-appointments">
          <div class="content-appointments--boddy">
            <div class="content-appointments--boddy---left">
              <h4 class="title">Selecione o Cliente</h4>
              <img src="@/assets/ilustration-customer.png" alt="" height="300">
            </div>
            
            <div class="content-appointments--right">

            </div>
          </div>

          <div class="content-appointments--boddy---actions mt-10">
            <Button label='Cancelar' outlined color='primary' />
            <Button label='Avançar' color='primary' class="ml-3" @click="steps = 2" />
          </div>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2">
        <div class="content-appointments">
          <div class="content-appointments--boddy">
            <div class="content-appointments--boddy---left">
              <h4 class="title">Selecione o Serviço</h4>
              <img src="@/assets/ilustration-service.png" alt="" height="300">
            </div>
            
            <div class="content-appointments--right">

            </div>
          </div>

          <div class="content-appointments--boddy---actions mt-10">
            <Button label='Voltar' outlined color='primary' @click="steps = 1" />
            <Button label='Avançar' color='primary' class="ml-3" @click="steps = 3" />
          </div>
        </div>
      </v-stepper-content>

      <v-stepper-content step="3">
        <div class="content-appointments">
          <div class="content-appointments--boddy">
            <div class="content-appointments--boddy---left">
              <h4 class="title">Escolha a Data e Hora</h4>
              <img src="@/assets/ilustration-data-time.png" alt="" height="300">
            </div>
            
            <div class="content-appointments--boddy---right">
              <v-date-picker v-model="date" v-if="!dateSelected" @input="selectDate"></v-date-picker>
              <v-time-picker v-model="timeStep" v-else :allowed-minutes="allowedStep" format="24hr" @input="selectHour"></v-time-picker>
            </div>
          </div>

          <div class="content-appointments--boddy---actions mt-10">
            <Button label='Cancelar' outlined color='primary' @click="steps = 2, date = null, dateSelected = false, hourSelected = false" />
            <Button label='Ver agenda' color='secondary' class="ml-3" @click="steps = 3" />
            <Button label='Concluir' :disabled="!hourSelected" color='primary' class="ml-3" @click="steps = 3" />
          </div>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Button from '@/components/vuetify/Button';

export default {
  name: 'Wizard',
  components: { Button },
  data () {
    return {
      steps: 3,
      date: null,
      dateSelected: false,
      hourSelected: false,
      timeStep: null,
    }
  },
  methods: {
    selectDate() {
      console.log(this.date)
      this.dateSelected = true;
    },
    selectHour() {
      this.hourSelected = true;
      console.log(this.timeStep);
    },
    allowedStep: m => m % 30 === 0,
  }
}
</script>

<style lang="scss" scoped>
.content-stepper {
  width: 100%;
  min-height: 580px;

  .content-appointments {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .content-appointments--boddy {
      width: 100%;
      display: flex;
      min-height: 395px;

      .content-appointments--boddy---left {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-right: 1px solid #ccc;

        .title {
          font-size: 28px !important;
          font-weight: normal;
          color: #069
        }
      }

      .content-appointments--boddy---right {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .title {
          font-size: 28px !important;
          font-weight: normal;
          color: #069
        }
      }
    }
  }
}
</style>