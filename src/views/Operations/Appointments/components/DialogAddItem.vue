<template>
  <Card :title="l.title">
    <DataTable show-select single-select :headers='addItemHeaders' :items='items' :loading='loading' @selected='setService' @getItems='getServices'>
      <template slot='custom-header'>
        <v-form v-model='valid' ref='form' lazy-validation>
          <AutoComplete v-model='collaborator' :label="l.dataTable.autoCompleteTitle" return-object :items='localCollaborators' />
        </v-form>
      </template>
    </DataTable>

    <template slot='actions'>
      <Button :label='l.actions.cancel' color='primary' rounded :icon='$icons.cancel' @click="$emit('update:dialog', false)" />
      <Button :label='l.actions.add' color='secondary' rounded class='ml-3' :disabled='!serviceSelected' :icon='$icons.plus' @click="add()" />
    </template>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';
import DataTable from '@/components/vuetify/DataTable';
import AutoComplete from '@/components/vuetify/AutoComplete';
import { required } from '@/utils/rules';

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
      rules:{
        required: required
      },
      valid: true,
      serviceSelected: null,
      items: {},
      loading: true,
      collaborator: {},
      localCollaborators: [],
    };
  },
  mounted() {
    this.getServices();
    this.localCollaborators = this.collaborators;
  },
  computed: {
    l () {
      return this.$locales.pt.appointments.CreateAppointment.dialogAddItem;
    },
    addItemHeaders() {
      return this.$schemas.appointment.headerAddItem;
    },
  },
  methods: {
    setService(data) {
      this.serviceSelected = data[0];
    },
    getServices(params = {}) {
      this.loading = true;
      const payload = { ...params, filter: { name: params.filter, nickname: params.filter }};
      this.$api.services.filters(payload).then((res) => {
        this.items = res.data;
      }).catch(() => {

      }).finally(() => {
        this.loading = false;
      });
    },
    add() {
      if (!this.collaborator.id) {
        this.$noty.error(this.l.notifications.error);
        return;
      }

      this.serviceSelected.service_id = this.serviceSelected.id;
      delete this.serviceSelected.id;

      this.$emit('handleActionModal', {
        action: 'addItem',
        item: {
          ...this.serviceSelected,
          collaborator: { ...this.collaborator, name: this.collaborator.text }
        }
      });
    }
  }
};
</script>

<style>

</style>