<template>
  <div>
    <div class="d-flex justify-end mb-5">
      <Button 
        label="Adicionar" 
        small 
        color="secondary" 
        rounded 
        class="btn-actions" 
        :icon="$icons.plus" 
        :disabled="orderFinished"
        @click="$emit('handleAction', handleAction(actionType))" />
    </div>
    <v-data-table
      dense
      hide-default-footer
      :loading="loading"
      :headers="headers"
      :items="items">

      <template v-slot:[`item.actions`]="{ item }" style="width: 200px">
        <Button 
          type-icon color="red"
          :icon="$icons.destroy"
          :disabled="orderFinished"
          @click="$emit('handleAction', handleAction('itemDestroy', item))" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';

export default {
  name: 'GenericDataTable',
  components: { Button },
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
      return { type, params: { ...data, componentType: this.componentType}}
    }
  }
}
</script>

<style>

</style>