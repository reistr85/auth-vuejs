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
        v-bind="propsComponents"
        :is="dialogComponent"
        @update:dialog="dialog = $event"
        @handleActionModal="handleActionModal" />
    </Dialog>
    <DialogConfirmation 
      v-bind="propsClosed"
      v-on="eventsClosed"
      :dialog="dialogClosed" 
      :maxWidth="parseInt(1000)"
      @noAction="dialogClosed = false" />
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
import DialogConfirmation from '@/components/DialogConfirmation';
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
    DialogDynamicMovement,
    DialogConfirmation
  },
  props: {},
  data() {
    return {
      schema: BoxSchema,
      service: BoxesService,
      dialog: false,
      dialogComponent: null,
      propsComponents: {},
      dialogClosed: false,
      propsClosed: {},
      boxClosed: {},
      eventsClosed: {},
      movement: {},
      boxOpen: false
    }
  },
  computed: {
    locales() {
      return this.$locales.pt.boxes.listBoxes;
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
      if(item.dataListProps.item.status === 'closed') return this.$noty.error('Caixa fechado!');
      this[item.i.action](item);
    },
    withdrawn(item, automatic = false) {
      if (automatic){
        this.movement = {
          payment_method_id: 1,
          box_id: item.dataListProps.item.id,
          box_movements_date: null,
          type: 'output',
          total_value: item.dataListProps.item.total_value,
          description: 'Sangria Fechamento'
        }
        this.$api.boxMovements.create(this.movement).then(() => {
          this.$noty.success(locales.alerts.createdRegister);
        }).catch((err) => {
          this.$noty.error(messageErrors(err));
        })
        this.closedBox();
      } else {
        this.dialog = true;
        this.dialogComponent = DialogDynamicMovement;
        this.propsComponents = {
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
    closed(item){
      this.dialogClosed = true;
      this.boxClosed = item;
      this.propsClosed = { message: item.dataListProps.item.total_value > 0 ? this.locales.messages.closed.totalValueLargerZero : this.locales.messages.closed.box }
      this.eventsClosed = { yesAction: item.dataListProps.item.total_value > 0 ? () => this.withdrawn(item, true) : () => this.closedBox() };
    },
    closedBox() {
      let status = 'closed';
      BoxesService.update(this.boxClosed.dataListProps.item.id, { status: status }).then(() => {
        this.$noty.success(locales.alerts.updatedRegister);
        this.$refs.dynamicListPage.getAll();
      }).catch((error) => {
        this.$noty.error(messageErrors(error));
      }).finally(() => {
        this.dialogClosed = false;
      });
    }
  }
}

</script>

<style lang="scss" scoped>

</style>