<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados Contas à Pagar" multiple :icon="$icons.list">
        <AccountPaymentData
          :account-payment="accountPayment"
          :registers="registers"
          :installment-type="installment_type"
          :account-finished="accountFinished"
          @eventsGenerateInstallment="eventsGenerateInstallment" />
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Parcelas" class="mt-3" multiple :icon="$icons.list">
        <GenericDataTable
          :loading="loading"
          :headers="headerInstallments" 
          :items="accountPayment.installments"
          @getInstallments="getAccountPaymentInstallments"
          :disabledBttn="disabledBttn"
          @handleAction="handleAction"/>
      </ExpansionPanel>

      <ExpansionPanel v-model="expModel" readonly title="Totais" class="mt-3" multiple :icon="$icons.list">
        <AccountPaymentTotals
          :account-payment="accountPaymentTotals" />
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
          @click="handleAction({ type: 'confirmSave', params: { status: $enums.accountPaymentStatus.PENDING }})" />
      </ExpansionPanel>

      <DialogConfirmation 
        v-bind="propsConfirmation"
        :dialog="dialogConfirmation" 
        :maxWidth="parseInt(1000)"
        @noAction="dialogConfirmation = false" 
        @yesAction="save" />

      <DialogConfirmation 
        :dialog="dialogPaid" 
        :loading="loadingPaid"
        :message="messagePaid" 
        :maxWidth="parseInt(1000)"
        @noAction="dialogPaid = false" 
        @yesAction="itemPaid" />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TypePageMixin from '@/mixins/TypePageMixin';
import Button from '@/components/vuetify/Button';
import AccountPaymentSchema from '../schemas/AccountPaymentSchema';
import AccountPaymentsService from '../services/AccountPaymentsService';
import AccountPaymentData from '../components/AccountPaymentData';
import AccountPaymentTotals from '../components/AccountPaymentTotals';
import GenericDataTable from '../components/GenericDataTable';
import DialogConfirmation from '@/components/DialogConfirmation';

export default {
  name: 'CreateAccountPayment',
  components: { 
    PageHeader, 
    PageContent, 
    ExpansionPanel,
    Button,
    AccountPaymentData,
    AccountPaymentTotals,
    GenericDataTable,
    DialogConfirmation
  },
  data() {
    return {
      schema: AccountPaymentSchema,
      service: AccountPaymentsService,
      expModel: [0],
      loading: false,
      loadingPaid: false,
      accountFinished: false,
      disabledBttn: false,
      accountPayment: {
        date_issuance: new Date().toISOString().substr(0, 10),
        installments: [],
      },
      accountPaymentTotals: {},
      registers: [],
      installment_type: [],
      dialogConfirmation: null,
      dialogPaid: false,
      propsConfirmation: {},
      installmentPaid: null,
      messagePaid: null,
    };
  },
  mounted() {
    if(this.typePage === this.typePageOptions.show)
      this.getAccountPayment();

    this.getRegisters();
    this.getInstallmentTypes();
    this.totalizers();
  },
  computed: {
    l() {
      return this.$locales.pt;
    },
    id() {
      return this.$route.params.id;
    },
    headerInstallments() {
      return this.schema.account_payment_installments;
    },
  },
  mixins: [TypePageMixin],
  methods: {
    getAccountPayment() {
      this.loading = true;
      this.$api.accountPayments.show(this.id).then((res) => {
        this.accountPayment = res;
        this.loading = false;
        let amount_pending = 0;
        amount_pending = parseFloat(this.accountPayment.amount) - parseFloat(this.accountPayment.amount_payment);
        this.accountPaymentTotals = {
          amount_pending: amount_pending,
          amount: this.accountPayment.amount,
          amount_payment: this.accountPayment.amount_payment,
        };
      }).catch((err) => {
        console.error(err);
        this.loading = false;
      });
      this.getAccountPaymentInstallments();
    },
    getAccountPaymentInstallments(options = {}) {
      this.loading = true;
      const payload = {
        page: options.page || 1,
      };
      this.$api.accountPayments.getAllAccountPaymentInstallmentsByAccountPaymentId(this.id, payload).then((res) => {
        this.accountPayment.installments = res.data.data.map((item) => {
          return {
            id: item.id,
            description: item.description,
            date_due: item.date_due,
            date_due_formatted: item.date_due_formatted,
            date_payment: item.date_payment,
            date_payment_formatted: item.date_payment_formatted,
            bank_formatted: item.bank_formatted,
            amount: item.amount,
            amount_formatted: item.amount_formatted,
            status: item.status,
            status_formatted: item.status_formatted,
          };
        });
        this.loading = false;
      }).catch((err) => {
        console.error(err);
        this.loading = false;
      });
    },
    totalizers() {
      let amount_pending = 0;
      amount_pending = parseFloat(this.accountPayment.amount) - parseFloat(this.accountPayment.amount_payment);
      this.accountPaymentTotals = {
        amount_pending: amount_pending,
        amount: this.accountPayment.amount,
        amount_payment: this.accountPayment.amount_payment,
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
      this.accountPayment.status = data.status;
      this.dialogConfirmation = true;
      this.propsConfirmation = { message: this.typePage === this.typePageOptions.create 
        ? this.l.accountPayments.createAccountPayment.messages.save.create 
        : this.l.accountPayments.createAccountPayment.messages.save.update };
    },
    save() {
      this.typePage === this.typePageOptions.create ? this.create() : this.update();
    },
    create() {
      this.$api.accountPayments.create(this.accountPayment).then(() => {
        this.$noty.success(this.$locales.pt.index.alerts.createdRegister);
        this.$router.push({ name: this.schema.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    update() {
      const { id } = this.$route.params;
      this.$api.accountPayments.update(id, this.accountPayment).then(() => {
        this.$noty.success(this.$locales.pt.index.alerts.updatedRegister);
        this.$router.push({ name: this.schema.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
    eventsGenerateInstallment(id) {
      if(this.accountPayment.installments.length) console.log('ja contem parcelas criadas');
      this.getGenerateInstallments(id);
    },
    getGenerateInstallments(id) {
      this.loading = true;
      const payload = {
        installment_type_id: id,
        amount: this.accountPayment.amount,
      };
      this.$api.installmentTypes.generateInstallments(payload).then((res) => {
        let parcel = 0;
        this.accountPayment.installments = res.data.map((item) => {
          parcel += 1;
          return {
            description: this.accountPayment.title + '-' + parcel + '/' + res.data.length,
            date_due: item.due_date,
            date_due_formatted: item.due_date_formatted,
            date_payment: item.due_payment,
            date_payment_formatted: item.due_payment_formatted,
            bank_id: 1,
            amount: item.value,
            amount_formatted: item.value_formatted,
            status: 'pending',
          };
        });
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
     handleItemPaid(params) {
      this.dialogPaid = true;
      this.messagePaid = 'Deseja fazer o pagamento da parcela ' + params.item.description;
      this.installmentPaid = {
        account_payment_id: this.accountPayment.id,
        id: params.item.id,
        description: params.item.description,
        date_due: params.item.date_due,
        date_payment: params.item.date_due,
        bank_id: 1,
        amount: params.item.amount,
        status: 'paid',
      };
    },
    itemPaid() {
      this.$api.accountPaymentInstallments.update(this.installmentPaid.id, this.installmentPaid).then(() => {
        this.$noty.success(this.$locales.pt.index.alerts.updatedRegister);
        this.loadingPaid = false;
        this.dialogPaid = false;
        this.getAccountPayment();
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.loadingPaid = false;
        this.dialogPaid = false;
      });
      this.totalizers();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>