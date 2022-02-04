<template>
  <div class="content-appointments">
    <div class="content-appointments--boddy">
      <div class="content-appointments--boddy---left">
        <h4 class="title">Selecione o Colaborador</h4>
        <img src="@/assets/ilustration-collaborator.png" alt="" height="300">
      </div>
      
      <div class="content-appointments--boddy---right pl-6">
        <div class="content-appointments--boddy---right----contributors">
          <DataTable
            show-select
            single-select
            :headers="headers"
            :items="collaborators"
            :loading="loading"
            @getItems="getItems"
            @selected="selectCollaborator" />
        </div>
      </div>
    </div>

    <div class="content-appointments--boddy---actions mt-10">
      <Button label='Voltar' outlined color='primary' @click="$emit('setStep', 1)" />
      <Button label='Avançar' color='primary' class="ml-3" :disabled="disabledBtnNext" @click="$emit('setStep', 3)" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';

export default {
  name: 'StepOne',
  components: { Button, DataTable },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    collaborators: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Contato', value: 'phone_formatted'},
      ],
      search: '',
      disabledBtnNext: true
    }
  },
  methods: {
    getItems(options) {
      this.$emit('getItems', { ...options, type: 'collaborator' });
    },
    selectCollaborator(customer) {
      customer.length ? this.disabledBtnNext = false : this.disabledBtnNext = true;
      this.$emit('selectRegister', { register: customer, type: 'collaborator' })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';

.content-appointments--boddy---right----contributors {
  width: 100%;
  min-height: 330px;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 3px;

  .content-appointments--boddy---right----contributors-----search-customer {
    width: 100%;
  }
}
</style>