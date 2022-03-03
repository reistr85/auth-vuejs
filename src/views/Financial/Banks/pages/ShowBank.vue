<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados Bancário" multiple :icon="$icons.list">
        <v-row>
          <v-col cols="12" md="3"><TextField v-model="bank.description" label="Descrição" readonly /></v-col>
          <v-col cols="12" md="2"><TextField v-model="bank.agency" label="Agência" readonly /></v-col>
          <v-col cols="12" md="2"><TextField v-model="bank.account" label="Conta" readonly /></v-col>
          <v-col cols="12" md="2"><TextField v-model="bank.account_type_formatted" label="Tipo Conta" readonly /></v-col>
          <v-col cols="12" md="3"><TextFieldMoney v-model="bank.total_value" label="Saldo Final" readonly /></v-col>
        </v-row>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Extrato" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          action-type="openDialog"
          componentType="DialogDynamicMovement"
          :loading="loading"
          :headers="headerMovements" 
          :items="items"
          @getItems="getBankMovements"
          :disabledBttn="disabledBttn"
          @handleAction="handleAction"/>
      </ExpansionPanel>
      <ExpansionPanel v-model="expModel" readonly title="Ações" class="mt-3" multiple :icon="$icons.list">
        <Button
          label="Voltar"
          color="light"
          rounded
          class="ml-3"
          :icon="$icons.arrowLeft"
          @click="$router.push({ name: schema.routes.list.name })" />
      </ExpansionPanel>
    </PageContent>

    <Dialog no-title no-actions :dialog="dialog"  :maxWidth="parseInt(1000)">
      <component 
        slot="content" 
        :is="dialogComponent" 
        v-bind="propsComponents"
        @update:dialog="dialog = $event"
        @handleActionModal="handleActionModal" />
    </Dialog>

    <DialogConfirmation :dialog="dialogDestroy" :loading="loadingDestroy" @noAction="dialogDestroy = false" @yesAction="itemDestroy" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import BankSchema from '../schemas/BankSchema';
import GenericDataTable from '../components/GenericDataTable';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TextField from '@/components/vuetify/TextField';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import Button from '@/components/vuetify/Button';
import Dialog from '@/components/vuetify/Dialog';
import DialogDynamicMovement from '@/views/Financial/Banks/components/DialogDynamicMovement';
import DialogConfirmation from '@/components/DialogConfirmation';
import { arrowLeft } from '@/utils/icons';

export default {
  name: 'ShowBank',
  components: { 
    PageHeader, 
    PageContent,
    GenericDataTable,
    ExpansionPanel,
    TextField,
    TextFieldMoney,
    Button,
    Dialog,
    DialogDynamicMovement,
    DialogConfirmation
  },
  props: {},
  data() {
    return {
      schema: BankSchema,
      expModel: [0],
      bank: {},
      loading: false,
      loadingDestroy: false,
      dialog: false,
      dialogDestroy: false,
      dialogComponent: null,
      propsComponents: null,
      disabledBttn: false,
      items: {},
      icons: {
        arrowLeft: arrowLeft,
      },
      idBankMovementDestroy: null
    }
  },
  mounted() {
    this.getBank();
    this.getBankMovements();
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    headerMovements() {
      return this.schema.bank_movements;
    },
  },
  methods: {
    getBank() {
      this.loading = true;
      this.$api.banks.show(this.id).then((res) => {
        this.bank = res;
        if(this.bank.situation === 'disabled') this.disabledBttn = true;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    async getBankMovements(options = {}) {
      const payload = {
        page: options.page || 1,
      }
      this.$api.banks.getAllBankMovementsByBankId(this.id, payload).then((res) => {
        this.items = res.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    openDialog({ componentType }) {
      this.dialog = true;
      this.dialogComponent = componentType;
      this.propsComponents= {
        title: 'Lançamento Manual',
        disabledDate: false,
        disabledTypeInputOutput: false,
        readonlyDescription: false,
        movement: {
          bank_id: this.id,
          movement_date: null,
          value: 0
        }
      }
    },
    handleAction(data) {
      const { type, params } = data;
      this[type](params);
    },
    handleActionModal() {
      this.dialog = false;
      this.getBank();
      this.getBankMovements();
    },
    handleItemDestroy(params) {
      this.dialogDestroy = true;
      this.idBankMovementDestroy = params.item.id;
    },
    itemDestroy() {
      this.loadingDestroy = true;
      console.log(this.idBankMovementDestroy)
      this.$api.bankMovements.delete(this.idBankMovementDestroy).then(() => {
        this.loadingDestroy = false;
        this.dialogDestroy = false;
        this.getBank();
        this.getBankMovements();
      }).catch((err) => {
        this.$noty.error(err);
        this.loadingDestroy = false;
        this.dialogDestroy = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>