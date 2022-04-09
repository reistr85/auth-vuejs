<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados do Caixa" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="2"><TextField v-model="box.box_date_formatted" label="Data da Caixa" readonly /></v-col>
          <v-col cols="12" md="4"><TextField v-model="box.employee" label="Funcionário" readonly /></v-col>
          <v-col cols="12" md="3"><TextFieldMoney v-model="box.initial_value" label="Valor Inicial" readonly /></v-col>
          <v-col cols="12" md="3"><TextFieldMoney v-model="box.total_value" label="Saldo Final" readonly /></v-col>
        </v-row>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Lançamentos do Caixa" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          action-type="openDialog"
          componentType="DialogDynamicMovement"
          :loading="loading"
          :headers="headerMovements"
          :items="items"
          @getItems="getBoxMovements"
          :disabledButton="disabledButton"
          @handleAction="handleAction"/>
      </ExpansionPanel>
    </PageContent>

    <Dialog no-title no-actions :dialog="dialog" :maxWidth="parseInt(1000)">
      <component
        slot="content"
        :is="dialogComponent"
        v-bind="propsComponents"
        @update:dialog="dialog = $event"
        @handleActionMovement="handleActionMovement"
        @handleActionModal="handleActionModal" />
    </Dialog>
    <DialogConfirmation :dialog="dialogDestroy" :loading="loadingDestroy" @noAction="dialogDestroy = false" @yesAction="itemDestroy" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import BoxSchema from '../schemas/BoxSchema';
import GenericDataTable from '../components/GenericDataTable';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TextField from '@/components/vuetify/TextField';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import Dialog from '@/components/vuetify/Dialog';
import DialogDynamicMovement from '@/views/Financial/Boxes/components/DialogDynamicMovement';
import DialogConfirmation from '@/components/DialogConfirmation';

export default {
  name: 'ShowBox',
  components: {
    PageHeader,
    PageContent,
    GenericDataTable,
    ExpansionPanel,
    TextField,
    TextFieldMoney,
    Dialog,
    DialogDynamicMovement,
    DialogConfirmation
  },
  props: {},
  data() {
    return {
      schema: BoxSchema,
      expModel: [0],
      box: {},
      loading: false,
      loadingDestroy: false,
      dialog: false,
      dialogDestroy: false,
      dialogComponent: null,
      propsComponents: null,
      items: {},
      disabledButton: false,
      idBoxMovementDestroy: null
    };
  },
  mounted() {
    this.getBox();
    this.getBoxMovements();
  },
  computed: {
    l() {
      return this.$locales.pt;
    },
    id() {
      return this.$route.params.id;
    },
    headerMovements() {
      return this.schema.box_movements;
    },
  },
  methods: {
    getBox() {
      this.loading = true;
      this.$api.boxes.show(this.id).then((res) => {
        this.box = res;
        if (this.box.status === 'closed') this.disabledButton = true;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    async getBoxMovements(options = {}) {
      const payload = {
        page: options.page || 1,
      };
      this.$api.boxes.getAllBoxMovementsByBoxId(this.id, payload).then((res) => {
        this.items = res.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    openDialog({ componentType }) {
      this.dialog = true;
      this.dialogComponent = componentType;
      this.propsComponents= {
        title: this.l.boxes.showBox.movements.dialogs.manual.title,
        disabledDate: false,
        disabledTypeInputOutput: false,
        readonlyDescription: false,
        movement: {
          box_id: this.id,
          box_movements_date: null,
          total_value: 0,
          description: ''
        }
      };
    },
    handleAction(data) {
      const { type, params } = data;
      this[type](params);
    },
    handleActionMovement(data) {
      const { action, item } = data;
      this.dialog = false;
      this[action](item);
    },
    handleActionModal() {
      this.dialog = false;
      this.getBox();
      this.getBoxMovements();
    },
    handleItemDestroy(params) {
      this.dialogDestroy = true;
      this.idBoxMovementDestroy = params.item.id;
    },
    itemDestroy() {
      this.loadingDestroy = true;
      this.$api.boxMovements.delete(this.idBoxMovementDestroy).then(() => {
        this.$noty.success(this.l.default.alerts.createdRegister);
        this.loadingDestroy = false;
        this.dialogDestroy = false;
        this.getBox();
        this.getBoxMovements();
      }).catch((err) => {
        this.$noty.error(err);
        this.loadingDestroy = false;
        this.dialogDestroy = false;
      });
    },
    saveMovement(movement) {
      movement.payment_method_id = 1;
      this.$api.boxMovements.create(movement).then(() => {
        this.$noty.success(this.l.default.alerts.createdRegister);
      }).catch((err) => {
        this.$noty.error(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>