<template>
  <div>
    <PageHeader :schema="$schemas.installmentType" />
    <PageContent>
      <ExpansionPanel v-model="expModel" readonly title="Dados Tipos do Parcelamento" multiple :icon="$icons.list">
        <InstallmentTypeData
          :installment-type="installment_type"
          @handleActionGenerate="handleActionGenerate" />
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
          @click="save" />
      </ExpansionPanel>
    </PageContent>
  </div>
</template>

<script>
import InstallmentTypeSchema from '../schemas/InstallmentTypeSchema';
import InstallmentTypesService from '../services/InstallmentTypesService';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import ExpansionPanel from '@/components/vuetify/ExpansionPanel';
import TypePageMixin from '@/mixins/TypePageMixin';
import Button from '@/components/vuetify/Button';
import InstallmentTypeData from '../components/InstallmentTypeData';

export default {
  name: 'CreateInstallmentType',
  components: {
    PageHeader,
    PageContent,
    ExpansionPanel,
    Button,
    InstallmentTypeData
  },
  data() {
    return {
      schema: InstallmentTypeSchema,
      service: InstallmentTypesService,
      expModel: [0],
      installment_type: {
        use_input_value: 'no',
        percent_input_value: 0
      },
    };
  },
  mounted() {
    if (this.typePage === this.typePageOptions.show)
      this.getInstallmentType();
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
    getInstallmentType() {
      this.loading = true;
      this.$api.installmentTypes.show(this.id).then((res) => {
        this.installment_type = res;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    save() {
      this.typePage === this.typePageOptions.create ? this.create() : this.update();
    },
    create() {
      this.$api.installmentTypes.create(this.installment_type).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.createdRegister);
        this.$router.push({ name: this.schema.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      });
    },
    update() {
      const { id } = this.$route.params;
      this.$api.installmentTypes.update(id, this.installment_type).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.updatedRegister);
        this.$router.push({ name: this.schema.routes.list.name });
      }).catch((err) => {
        this.$noty.error(err);
      });
    },
    handleActionGenerate(installments) {
      this.installment_type.interval_installments = installments;
    }
  }
};
</script>
