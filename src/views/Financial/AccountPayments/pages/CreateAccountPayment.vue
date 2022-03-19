<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados Contas à Pagar" multiple :icon="$icons.list">
        <div slot="status">
          soifnsonfsoinfsoi
        </div>
        <AccountPaymentData
          :account-payment="accountPayment"
          :registers="registers"
          :account-finished="accountFinished" />
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
        @noAction="dialogConfirmation = false" 
        :maxWidth="parseInt(1000)"
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
import AccountPaymentSchema from '../schemas/AccountPaymentSchema';
import AccountPaymentsService from '../services/AccountPaymentsService';
import AccountPaymentData from '../components/AccountPaymentData';
import DialogConfirmation from '@/components/DialogConfirmation';

export default {
  name: 'CreateAccountPayment',
  components: { 
    PageHeader, 
    PageContent, 
    ExpansionPanel,
    Button,
    AccountPaymentData,
    DialogConfirmation
  },
  data() {
    return {
      schema: AccountPaymentSchema,
      service: AccountPaymentsService,
      expModel: [0],
      loading: false,
      accountFinished: false,
      accountPayment: {
        date_issuance: new Date().toISOString().substr(0, 10),
        instalments: [],
      },
      registers: [],
      dialogConfirmation: null,
      propsConfirmation: {}
    };
  },
  mounted() {
    if(this.typePage === this.typePageOptions.show)
      this.getAccountPayment();

    this.getRegisters();
  },
  computed: {
    l() {
      return this.$locales.pt;
    },
    id() {
      return this.$route.params.id;
    }
  },
  mixins: [TypePageMixin],
  methods: {
    getAccountPayment() {
      this.loading = true;
      this.$api.accountPayments.show(this.id).then((res) => {
        this.accountPayment = res;
        this.loading = false;
      }).catch((err) => {
        console.error(err);
        this.loading = false;
      });
    },
    getRegisters() {
      this.$api.registers.index().then((res) => {
        this.registers = res.data.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            value: item.id,
          };
        });
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
      console.log('accountPayment', this.accountPayment);
      this.$api.accountPayments.update(id, this.accountPayment).then(() => {
        this.$noty.success(this.$locales.pt.index.alerts.updatedRegister);
        this.$router.push({ name: this.schema.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      }).finally(() => {
        this.dialogConfirmation = false;
      });
    },
  }
};
</script>

<style lang="scss" scoped>

</style>