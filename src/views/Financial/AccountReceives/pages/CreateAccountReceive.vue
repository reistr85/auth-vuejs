<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados Contas à Receber" multiple :icon="$icons.list">
        <AccountReceiveData
          :account-receive="accountReceive"
          :registers="registers"
          :installment-type="installment_type"
          :account-finished="disabledButton"
          @eventsGenerateInstallment="eventsGenerateInstallment" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Parcelas" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          :loading="loading"
          :headers="headerInstallments"
          :items="installments"
          :disabledButton="disabledButton"
          @getInstallments="getAccountReceiveInstallments"
          @handleAction="handleAction"/>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Totais" class="mt-3" multiple :icon="$icons.list">
        <AccountReceiveTotals :account-receive="accountReceiveTotals" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Ações" class="mt-3" multiple :icon="$icons.list">
        <Button
          label="Voltar"
          color="light"
          rounded
          class=""
          :icon="$icons.arrowLeft"
          @click="$router.push({ name: schema.routes.list.name })" />
        <Button
          label="Salvar"
          color="success"
          rounded
          class="ml-3"
          :icon="$icons.save"
          :disabled="disabledButton"
          @click="handleAction({ type: 'confirmSave', params: { status: $enums.accountReceiveStatus.PENDING }})" />
      </ExpansionPanel>

      <Dialog no-actions :dialog="dialog"  :maxWidth="parseInt(1000)">
        <component
          v-bind="propsEditInstallment"
          slot="content"
          :is="dialogComponent"
          @update:dialog="dialog = $event"
          @handleActionInstallmentSave="handleActionInstallmentSave" />
      </Dialog>

      <DialogConfirmation
        :dialog="dialogPaid"
        :loading="loadingPaid"
        :message="messagePaid"
        :maxWidth="parseInt(1000)"
        @noAction="dialogPaid = false"
        @yesAction="itemPaid()" />

      <DialogConfirmation
        v-bind="propsConfirmation"
        :dialog="dialogConfirmation"
        :maxWidth="parseInt(1000)"
        @noAction="dialogConfirmation = false"
        @yesAction="save" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TypePageMixin from '@/mixins/TypePageMixin';
import Button from '@/components/vuetify/Button';
import AccountReceiveSchema from '../schemas/AccountReceiveSchema';
import AccountReceivesService from '../services/AccountReceivesService';
import AccountReceiveData from '../components/AccountReceiveData';
import AccountReceiveTotals from '../components/AccountReceiveTotals';
import DialogEditInstallment from '../components/DialogEditInstallment';
import GenericDataTable from '../components/GenericDataTable';
import Dialog from '@/components/vuetify/Dialog';
import DialogConfirmation from '@/components/DialogConfirmation';

export default {
  name: 'CreateAccountReceive',
  components: {
    PageHeader,
    PageContent,
    ExpansionPanel,
    Button,
    AccountReceiveData,
    AccountReceiveTotals,
    GenericDataTable,
    DialogEditInstallment,
    Dialog,
    DialogConfirmation
  },
  data() {
    return {
      schema: AccountReceiveSchema,
      service: AccountReceivesService,
      expModel: [0],
      loading: false,
      loadingPaid: false,
      accountFinished: false,
      disabledButton: false,
      accountReceive: {
        date_issuance: new Date().toISOString().substr(0, 10),
        installments: [],
      },
      installments: [],
      accountReceiveTotals: {},
      registers: [],
      installment_type: [],
      dialog: false,
      dialogConfirmation: null,
      dialogComponent: null,
      dialogEditInstallment: false,
      dialogPaid: false,
      propsConfirmation: {},
      propsEditInstallment: null,
      installmentPaid: null,
      messagePaid: null,
    };
  },
  mounted() {
    if (this.typePage === this.typePageOptions.show)
      this.getAccountReceive();

    this.getRegisters();
    this.getInstallmentTypes();
  },
  computed: {
    l() {
      return this.$locales.pt;
    },
    id() {
      return this.$route.params.id;
    },
    headerInstallments() {
      return this.schema.account_receive_installments;
    },
  },
  mixins: [TypePageMixin],
  methods: {
    getAccountReceive() {
      this.loading = true;
      this.$api.accountReceives.show(this.id).then((res) => {
        this.accountReceive = res;
        this.loading = false;
        this.totalizers(res);
        if (this.accountReceive.status === 'settled') this.disabledButton = true;
      }).catch(() => {
        this.loading = false;
      });
      this.getAccountReceiveInstallments();
    },
    getAccountReceiveInstallments(options = {}) {
      this.loading = true;
      const payload = {
        page: options.page || 1,
      };
      this.$api.accountReceives.getAllAccountReceiveInstallmentsByAccountReceiveId(this.id, payload).then((res) => {
        this.installments = res.data.map((item) => {
          return {
            id: item.id,
            description: item.description,
            date_due: item.date_due,
            date_due_formatted: item.date_due_formatted,
            date_receive: item.date_receive,
            date_receive_formatted: item.date_receive_formatted,
            bank_id: item.bank_id,
            bank_formatted: item.box == this.$enums.typeYesNo.YES? 'Caixa' : item.bank_formatted,
            box: item.box,
            payment_method_id: item.payment_method_id,
            payment_method_formatted: item.payment_method_formatted,
            amount: item.amount,
            amount_formatted: item.amount_formatted,
            status: item.status,
            status_formatted: item.status_formatted,
          };
        });
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    totalizers(accountReceive) {
      let amount_pending = 0;
      amount_pending = parseFloat(accountReceive.amount) - parseFloat(accountReceive.amount_receive);
      this.accountReceiveTotals = {
        amount: accountReceive.amount,
        amount_pending: amount_pending,
        amount_receive: accountReceive.amount_receive,
      };
    },
    getRegisters() {
      this.loading = true;
      this.$api.registers.index().then((res) => {
        this.registers = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          };
        });
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    getInstallmentTypes() {
      this.loading = true;
      this.$api.installmentTypes.index().then((res) => {
        this.installment_type = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.description,
            value: item.id,
          };
        });
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handleAction(data) {
      const { type, params } = data;
      this[type](params);
    },
    confirmSave(data) {
      this.accountReceive.status = data.status;
      this.dialogConfirmation = true;
      this.propsConfirmation = { message: this.typePage === this.typePageOptions.create
        ? this.l.accountReceives.createAccountReceive.messages.save.create
        : this.l.accountReceives.createAccountReceive.messages.save.update };
    },
    save() {
      this.typePage === this.typePageOptions.create ? this.create() : this.update();
    },
    create() {
      this.$api.accountReceives.create(this.accountReceive).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.createdRegister);
        this.$router.push({ name: this.schema.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    update() {
      const { id } = this.$route.params;
      this.$api.accountReceives.update(id, this.accountReceive).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.updatedRegister);
        this.$router.push({ name: this.schema.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    eventsGenerateInstallment(id) {
      if (this.installments.length)console.log('ja contem parcelas criadas');
      this.getGenerateInstallments(id);
    },
    getGenerateInstallments(id) {
      this.loading = true;
      const payload = {
        installment_type_id: id,
        amount: this.accountReceive.amount,
      };
      this.$api.installmentTypes.generateInstallments(payload).then((res) => {
        let parcel = 0;
        this.installments = res.data.map((item) => {
          parcel += 1;
          return {
            description: this.accountReceive.title + '-' + parcel + '/' + res.data.length,
            date_due: item.due_date,
            date_due_formatted: item.due_date_formatted,
            date_receive: item.due_receive,
            date_receive_formatted: item.due_receive_formatted,
            bank_id: 1,
            amount: item.value,
            amount_formatted: item.value_formatted,
            status: 'pending',
          };
        });
        this.accountReceive.installments = this.installments;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handleItemEdit(params) {
      this.dialog = true;
      this.dialogEditInstallment = true;
      this.dialogComponent = DialogEditInstallment;
      this.propsEditInstallment = {
        disabled: params.item.status == this.$enums.accountReceiveStatus.SETTLED ? true : false,
        box: {
          label: 'Usar Caixa',
          value: params.item.box == this.$enums.typeYesNo.YES ? true : false
        },
        installment: {
          account_receive_id: this.accountReceive.id,
          id: params.item.id,
          description: params.item.description,
          date_due: params.item.date_due,
          date_receive: params.item.date_receive,
          payment_method_id: params.item.payment_method_id,
          bank_id: params.item.bank_id,
          box: params.item.box == this.$enums.typeYesNo.YES ? true : false,
          amount: params.item.amount,
          status: params.item.status
        }
      };
    },
    handleActionInstallmentSave() {
      this.dialog = false;
      this.dialogEditInstallment = false;
      this.getAccountReceiveInstallments();
    },
    handleItemPaid(params) {
      this.dialogPaid = true;
      this.messagePaid = 'Deseja fazer o recebimento da parcela ' + params.item.description;
      this.installmentPaid = {
        account_receive_id: this.accountReceive.id,
        id: params.item.id,
        description: params.item.description,
        date_due: params.item.date_due,
        date_receive: params.item.date_receive,
        payment_method_id: params.item.payment_method_id,
        box: params.item.box,
        bank_id: params.item.bank_id,
        amount: params.item.amount,
        status: 'paid',
      };
    },
    itemPaid() {
      this.loading = true;
      this.loadingPaid = true;
      this.$api.accountReceiveInstallments.update(this.installmentPaid.id, this.installmentPaid).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.updatedRegister);
        this.loading = false;
        this.loadingPaid = false;
        this.dialogPaid = false;
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.loading = false;
        this.loadingPaid = false;
        this.dialogPaid = false;
        this.getAccountReceive();
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>