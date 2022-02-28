<template>
  
  <div class="content-boxes">
    <div class="content-appointments--boddy">
      <h3>Abrir Caixa</h3>
        <AutoComplete v-model="box.collaborator_id" label="Colaborador" :items="collaborators" />
    </div>
    <div slot="actions">
        <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded class="" @click="handleCancel()" />
        <Button label="Salvar" :icon="$icons.plus" color="secondary" rounded class="ml-3" @click="$emit('handleCancel')" />
    </div>
  </div>

</template>

<script>
import Button from '@/components/vuetify/Button';
import AutoComplete from '@/components/vuetify/AutoComplete';
import { mountParamsApiFilter } from '@/utils';


export default {
  name: 'WizardBox',
  components: {
    Button,
    AutoComplete
  },
  data () {
    return {
      icons: {},
      expModel: [0],
      box: {},
      collaborators: [],
    }
  },
  mounted() {
    this.getCollaborators();
  },
  methods: {
    getCollaborators() {
      const { options, filters } = mountParamsApiFilter({ type: 'collaborator' });

      this.registersService.filters(options, filters).then((res) => {
        this.collaborators = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          }
        })
      }).catch(() => {
        this.loading = false;
      })
    },
    handleCancel() {
      this.dialog = false;
    },
  }
}
</script>

<style lang="scss" scoped>
</style>