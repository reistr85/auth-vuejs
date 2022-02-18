<template>
  <div>
    <div class="d-flex justify-end mb-5">
      <Button 
        label="Adicionar" 
        small 
        :icon="$icons.plus" 
        color="secondary" 
        rounded 
        class="btn-actions" 
        @click="$emit('handleAction', handleAction(actionType))" />
    </div>
    <v-data-table
      dense
      hide-default-footer
      :loading="loading"
      :headers="headers"
      :items="items">

      <template v-slot:[`item.actions`]="{ item }" style="width: 200px">
        <Button :icon="$icons.destroy" type-icon color="red" @click="$emit('handleAction', handleAction('itemDestroy', item))" />
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