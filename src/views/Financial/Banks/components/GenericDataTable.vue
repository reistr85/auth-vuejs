<template>
  <div>
    <div class="d-flex justify-end mb-5">
      <Button 
        label="Adicionar Lançamento" 
        small 
        :icon="$icons.plus" 
        color="secondary" 
        rounded 
        class="btn-actions"
        :disabled="disabledBttn"
        @click="$emit('handleAction', handleAction(actionType))" />
    </div>
    <DataTable
      no-search
      itemKey="number_item"
      :headers="headers"
      :items="items"
      :loading="loading"
      @getItems="getItems">
      <!-- <template v-slot:actions="{ props }">
        <Button 
          type-icon color="red"
          :icon="$icons.destroy"
          :disabled="disabledBttn"
          @click="$emit('handleAction', handleAction('itemDestroy', props))" />
      </template> -->
      <template v-slot:[`item.actions`]="{ item }" style="width: 200px">
        <Button :icon="$icons.destroy" type-icon color="red" @click="$emit('handleAction', handleAction('itemDestroy', item))" />
      </template>
    </DataTable>
    <!-- <v-data-table
      dense
      :loading="loading"
      :headers="headers"
      :items="items">

      <template v-slot:[`item.actions`]="{ item }" style="width: 200px">
        <Button :icon="$icons.destroy" type-icon color="red" @click="$emit('handleAction', handleAction('itemDestroy', item))" />
      </template>
    </v-data-table> -->
  </div>
</template>

<script>
import DataTable from '@/components/vuetify/DataTable';
import Button from '@/components/vuetify/Button';

export default {
  name: 'GenericDataTable',
  components: { Button, DataTable },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    actionType: {
      type: String,
      required: true,
    },
    componentType: {
      type: String,
      required: true,
    },
    disabledBttn: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleAction(type, data = null) {
      return { type, params: { ...data, componentType: this.componentType}}
    },
    getItems(options) {
      this.$emit('getItems', options);
    }
  }
}
</script>

<style>

</style>