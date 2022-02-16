<template>
  <div>
    <div class="d-flex justify-end mb-5">
      <Button label="Adicionar" small :icon="$icons.plus" color="secondary" rounded class="btn-actions" @click="$emit('handleAction', {})" />
    </div>
    <v-data-table
      dense
      hide-default-footer
      :loading="loading"
      :headers="headers"
      :items="items">

      <template v-slot:[`item.actions`]="" style="width: 200px">
        <Button :icon="$icons.destroy" type-icon color="red" />
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
  }
}
</script>

<style>

</style>