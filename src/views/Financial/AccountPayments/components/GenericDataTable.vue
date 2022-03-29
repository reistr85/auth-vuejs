<template>
  <div>
    <div class="d-flex justify-end mb-5">
    </div>
    <DataTable
      no-sync
      no-search
      itemKey="number_item"
      :headers="headers"
      :items="items"
      :loading="loading"
      @getInstallments="getInstallments">

     <template v-slot:actions="{ props }">
       <Button 
          type-icon color="gray"
          :icon="$icons.edit"
          @click="$emit('handleAction', handleAction('handleItemEdit', props))" />
        <Button 
          type-icon color="green"
          :icon="$icons.check"
          @click="$emit('handleAction', handleAction('handleItemPaid', props))" />
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
    // componentType: {
    //   type: String,
    //   required: true,
    // },
    disabledBttn: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleAction(type, data = null) {
      return { type, params: { ...data }};
    },
    getInstallments(options) {
      this.$emit('getAccountPaymentInstallments', options);
    }
  }
};
</script>

<style>

</style>