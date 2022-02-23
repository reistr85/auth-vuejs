<template>
  <Card title="Adicionar Item">
    <DataTable
      show-select
      single-select
      :headers="addItemHeaders"
      :items="items"
      :loading="loading"
      @selected="setService"
      @getItems="getServices" />

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
        @click="$emit('handleActionModal', { action: 'addItem', item: serviceSelected })" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';
// import { mountParamsApiFilter } from '@/utils';

export default {
  name: 'DialogAddItem',
  components: { Card, Button, DataTable },
  props: {},
  data() {
    return {
      serviceSelected: null,
      items: {},
      loading: true,
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
    getServices(params = {}) {
      this.loading = true;
      this.servicesService.filters(params).then((res) => {
        this.items = res.data;
      }).catch(() => {

      }).finally(() => {
        this.loading = false;
      });
    },
  }
}
</script>

<style>

</style>