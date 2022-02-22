<template>
  <Card title="Adicionar Item">
    <DataTable
      :headers="addItemHeaders"
      :items="items"
      show-select
      single-select
      @selected="setService" />

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
        @click="$emit('handleActionModal', form)" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';

export default {
  name: 'DialogAddItem',
  components: { Card, Button, DataTable },
  props: {},
  data() {
    return {
      form: {},
      serviceSelected: null,
      items: {},
    }
  },
  mounted() {
    this.getServices();
  },
  computed: {
    addItemHeaders() {
      return this.orderServiceSchema.headerAddItem;
    }
  },
  methods: {
    setService(data) {
      this.serviceSelected = data[0]
    },
    getServices() {
      this.servicesService.index().then((res) => {
        this.items = res.data;
      }).catch(() => {

      })
    },
  }
}
</script>

<style>

</style>