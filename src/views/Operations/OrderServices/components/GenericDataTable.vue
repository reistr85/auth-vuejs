<template>
  <div>
<<<<<<< HEAD
    <div class='d-flex justify-end mb-5'>
      <Button
        label='Adicionar'
        small
        color='secondary'
        rounded
        class='btn-actions'
        :icon='$icons.plus'
        :disabled='orderFinished'
=======
    <div class="d-flex justify-end mb-5">
      <Button
        label="Adicionar"
        small
        color="secondary"
        rounded
        class="btn-actions"
        :icon="$icons.plus"
        :disabled="orderFinished"
>>>>>>> refactor eslint
        @click="$emit('handleAction', handleAction(actionType))" />
    </div>
    <DataTable
      no-sync
      no-search
      hide-default-footer
      itemKey='number_item'
      :headers='headers'
      :items='items'
      :loading='loading'>

      <template v-slot:actions="{ props }">
        <Button
          type-icon color="red"
          :icon="$icons.destroy"
          :disabled="orderFinished || !props.item.newItem"
          @click="$emit('handleAction', handleAction('itemDestroy', props))" />
      </template>
    </DataTable>
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
      type: Array,
      default: () => [],
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
    orderFinished: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    handleAction(type, data = null) {
<<<<<<< HEAD
      return { type, params: { ...data, componentType: this.componentType}};
=======
      return { type, params: { ...data, componentType: this.componentType} };
>>>>>>> refactor eslint
    }
  }
};
</script>

<style>

</style>