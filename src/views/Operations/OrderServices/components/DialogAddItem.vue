<template>
  <Card title="Adicionar Item">
    <DataTable
      show-select
      single-select
      :headers="addItemHeaders"
      :items="items"
      :loading="loading"
      @selected="setService"
      @getItems="getServices">

      <template slot="custom-header">
        <AutoComplete
          v-model="collaborator"
          label="Colaborador"
          return-object
          :items="localCollaborators" />
      </template>
    </DataTable>

    <div slot="actions">
      <Button 
        label="Cancelar" 
        color="primary" 
        rounded 
        class=""
        :icon="$icons.cancel" 
        @click="$emit('update:dialog', false)" />
      <Button 
        label="Adicionar" 
        color="secondary" 
        rounded 
        class="ml-3" 
        :disabled="!serviceSelected"
        :icon="$icons.plus" 
        @click="add()" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';
import AutoComplete from '@/components/vuetify/AutoComplete';

export default {
  name: 'DialogAddItem',
  components: { Card, Button, DataTable, AutoComplete },
  props: {
    collaborators: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      serviceSelected: null,
      items: {},
      loading: true,
      collaborator: {},
      localCollaborators: [],
    }
  },
  mounted() {
    this.getServices();
    this.localCollaborators = this.collaborators;
  },
  computed: {
    addItemHeaders() {
      return this.$schemas.orderService.headerAddItem;
    }
  },
  methods: {
    setService(data) {
      this.serviceSelected = data[0]
    },
    getServices(params = {}) {
      this.loading = true;
      this.$api.services.filters(params).then((res) => {
        this.items = res.data;
      }).catch(() => {

      }).finally(() => {
        this.loading = false;
      });
    },
    add() {
      this.$emit('handleActionModal', {
        action: 'addItem',
        item: {
          ...this.serviceSelected, collaborator: { ...this.collaborator, name: this.collaborator.text } } 
      })
    }
  }
}
</script>

<style>

</style>