<template>
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
      <Button label='Voltar' outlined color='primary' @click="$emit('setStep', 2)" />
      <Button label='Avançar' color='primary' class="ml-3" @click="$emit('setStep', 4)" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';

export default {
  name: 'StepThree',
  components: { Button },
  props: {},
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>