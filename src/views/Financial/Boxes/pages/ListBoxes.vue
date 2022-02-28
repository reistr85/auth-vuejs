<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicListPage :schema="schema" :service="service">
      <div slot="custom-header">
        <Button label="Abrir Caixa" color="primary" rounded @click="openDialog()"/>
      </div>
      </DynamicListPage>
    </PageContent>
    <Dialog :dialog="dialog" :maxWidth="parseInt(1000)" no-title no-actions>
      <div slot="content">
        <component :is="dialogComponent" @openBox="openBox" />
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/vuetify/Dialog';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import BoxSchema from '../schemas/BoxSchema';
import DynamicListPage from '@/components/dynamics/DynamicListPage';
import BoxesService from '../services/BoxesService';
import Button from '@/components/vuetify/Button';
import WizardBox from '@/views/Financial/Boxes/components/WizardBox';

export default {
  name: 'ListBoxes',
  components: { PageHeader, PageContent, DynamicListPage, Button, Dialog, WizardBox },
  props: {},
  data() {
    return {
      schema: BoxSchema,
      service: BoxesService,
      dialog: false,
      dialogComponent: null,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.dialogComponent = WizardBox;
    },
    openBox() {
      this.dialog = false;
    },
  }
}

</script>

<style lang="scss" scoped>

</style>