<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados do Caixa" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="2"><TextField v-model="box.box_date" label="Data da Caixa" readonly /></v-col>
          <v-col cols="12" md="4"><TextField v-model="box.collaborator" label="Funcionário" readonly /></v-col>
          <v-col cols="12" md="3"><TextFieldMoney v-model="box.initial_value" label="Valor Inicial" readonly /></v-col>
          <v-col cols="12" md="3"><TextFieldMoney v-model="box.total_value" label="Valor Final" readonly /></v-col>
        </v-row>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Lançamentos do Caixa" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          action-type="openDialog"
          componentType="DialogAddMovement"
          :loading="loading"
          :headers="headerMovements" 
          :items="box.movements"
          @handleAction="handleAction"/>
      </ExpansionPanel>
    </PageContent>

    <Dialog no-title no-actions :dialog="dialog"  :maxWidth="parseInt(1000)">
      <component 
        slot="content" 
        :is="dialogComponent" 
        @update:dialog="dialog = $event" 
        @handleActionModal="handleActionModal" />
    </Dialog>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import BoxSchema from '../schemas/BoxSchema';
import BoxesService from '../services/BoxesService';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import GenericDataTable from '../components/GenericDataTable';
import TextField from '@/components/vuetify/TextField';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import Dialog from '@/components/vuetify/Dialog';
import DialogAddMovement from '../components/DialogAddMovement';


export default {
  name: 'ShowBoxMovements',
  components: { 
    PageHeader, 
    PageContent,
    GenericDataTable,
    ExpansionPanel,
    TextField,
    TextFieldMoney,
    Dialog,
    DialogAddMovement
  },
  props: {},
  data() {
    return {
      schema: BoxSchema,
      service: BoxesService,
      expModel: [0],
      box: {},
      loading: false,
      dialog: false,
      dialogComponent: null,
    }
  },
  mounted() {
    this.getBox();
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    headerMovements() {
      return this.schema.box_movements;
    },
  },
  methods: {
    getBox() {
      this.loading = true;
      this.boxesService.show(this.id).then((res) => {
        this.mountForm(res);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    saveMovement(movement) {
      this.loading = true;
      movement.box_id = this.id;
      movement.payment_method_id = 1;
      this.boxMovementsService.create(movement).then(() => {
        this.loading = false;
        this.getBox();
      }).catch(() => {
        this.loading = false;
      })
    },
    mountForm(data) {
      this.box = {
        box_date: data.box_date_formatted,
        initial_value: data.initial_value,
        total_value: data.total_value,
        collaborator_id: data.collaborator_id,
        collaborator: data.collaborator.name,
        movements: []
      }

      this.box.movements = data.movements.map((item) => {
        return {
          id: item.id,
          box_movements_date: item.box_movements_date_formatted,
          origin_type: item.origin_type,
          origin_id: item.origin_id,
          total_value: item.total_value_formatted,
          description: item.description,
          newItem: false
        }
      });
    },
    openDialog({ componentType }) {
      this.dialog = true;
      this.dialogComponent = componentType;
    },
    handleAction(data) {
      const { type, params } = data;
      this[type](params);
    },
    handleActionModal(form) {
      this.dialog = false;
      this.saveMovement(form);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>