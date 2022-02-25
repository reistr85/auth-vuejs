<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent>
      <DynamicListPage ref="dynamicListPage" :schema="schema" :service="service" @actionMoreActions="actionMoreActions">
      <div slot="custom-header">
        <Button label="Abrir Caixa" color="primary" rounded @click="openDialog()"/>
      </div>
      </DynamicListPage>
    </PageContent>
    <Dialog :dialog="dialog" :maxWidth="parseInt(1000)" no-title no-actions>
      <component 
        slot="content" 
        :is="dialogComponent"
        v-bind="propsComponents"
        @update:dialog="dialog = $event"
        @handleActionModal="handleActionModal"
      />
    </Dialog>
    <Dialog :dialog="dialogClosed" :maxWidth="parseInt(1000)" no-title no-actions>
    <div slot="content">
      {{ " Não será possível fazer o fechamento do caixa, pois conta Saldo Final maior que zero. " }}
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
import DialogOpenBox from '@/views/Financial/Boxes/components/DialogOpenBox';
import DialogDynamicMovement from '@/views/Financial/Boxes/components/DialogDynamicMovement';
import { messageErrors } from '@/utils';
import locales from '@/locales/pt-BR';

export default {
  name: 'ListBoxes',
  components: { 
    PageHeader,
    PageContent,
    DynamicListPage,
    Button,
    Dialog,
    DialogOpenBox,
    DialogDynamicMovement
  },
  props: {},
  data() {
    return {
      schema: BoxSchema,
      service: BoxesService,
      dialog: false,
      dialogComponent: null,
      propsComponents: null,
      dialogClosed: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.dialogComponent = DialogOpenBox;
    },
    handleActionModal() {
      this.dialog = false;
      this.$refs.dynamicListPage.getAll();
    },
    actionMoreActions(item) {
      this[item.i.action](item);
    },
    withdrawn(item) {
      this.dialog = true;
      this.dialogComponent = DialogDynamicMovement;
      this.propsComponents= {
        title: 'Lançamento de Sangria',
        disabledDate: true,
        disabledTypeInputOutput: true,
        readonlyDescription: true,
        movement: {
          box_id: item.dataListProps.item.id,
          box_movements_date: null,
          type: 'output',
          total_value: 0,
          description: 'Sangria'
        }
      }
    },
    entrance(item) {
      this.dialog = true;
      this.dialogComponent = DialogDynamicMovement;
      this.propsComponents= {
        title: 'Lançamento de Suprimento',
        disabledDate: true,
        disabledTypeInputOutput: true,
        readonlyDescription: true,
        movement: {
          box_id: item.dataListProps.item.id,
          box_movements_date: null,
          type: 'input',
          total_value: 0,
          description: 'Suprimento'
        }
      }
    },
    closed(item) {
      if(item.dataListProps.item.total_value > 0) return this.dialogClosed = true;
      
      let status = 'closed';
      BoxesService.update(item.dataListProps.item.id, { status: status }).then(() => {
        this.$noty.success(locales.alerts.updatedRegister);
        this.$refs.dynamicListPage.getAll();
      }).catch((error) => {
        this.$noty.error(messageErrors(error));
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>