<template>
  <div>
    <div>
      <div class="mb-3">
        <slot name="custom-header" />
      </div>
      <div class="mb-5 d-flex justify-space-between">
        <div class="d-flex flex-wrap  justify-start">
          <div v-for="(item, index) in searchChips" :key="index">
            <Chip 
              v-if="!item.noChip"
              dense
              close
              class="mr-2"
              :label="`${item.label}: ${item.formattedValue}`" 
              @click:close="closeChip(item)" />
          </div>
        </div>
        <div>
          <SearchListPage ref="searchListPage" :items="schema.filters.items" v-if="schema.filters.has" @searchItems="searchItems" />
        </div>
      </div>
    </div>

    <v-data-table
      v-model="selected"
      item-key="id"
      class="elevation-1"
      dense
      :show-expand="schema.showExpand"
      :loading="loading"
      :headers="headers"
      :items="localItems.data"
      :options.sync="options"
      :server-items-length="totalLocalItems"
      :single-select="schema.singleSelect"
      :show-select="schema.checkItem">

      <template v-slot:expanded-item="">
          <slot name="content-expanded" />
      </template>

      <template v-slot:[`item.use_nickname_formatted`]="{ item }">
        <Chip :label="item.use_nickname_formatted" small :color="colorsUseNickname[item.use_nickname]" />
      </template>

      <template v-slot:[`item.situation_formatted`]="{ item }">
        <Chip :label="item.situation_formatted" small :color="colorsSituation[item.situation]" />
      </template>

      <template v-slot:[`item.status_formatted`]="{ item }">
        <Chip :label="item.status_formatted" small :color="colorsStatus[item.status]" />
      </template>

      <template v-slot:[`item.actions`]="props">
        <ActionsListPage 
          :schema="schema" 
          :icons="icons" 
          :data-list-props="props"
          @openDialogDestroy="openDialogDestroy"
          @actionMoreActions="actionMoreActions" />
      </template>
    </v-data-table>

    <div>
      <slot name="custom-footer" />
    </div>
    <DialogConfirmation :dialog="dialog" :loading="loadingDestroy" @noAction="clearProps" @yesAction="destroy" />
  </div>
</template>

<script>
import { search, view, destroy, dotsVertical, filter, cancel, check } from '@/utils/icons';
import { typeSituation } from '@/utils/options';
import DialogConfirmation from '@/components/DialogConfirmation';
import SearchListPage from './components/SearchListPage';
import ActionsListPage from './components/ActionsListPage';
import Chip from '@/components/vuetify/Chip';

const COLORS_STATUS = Object.freeze({
  pending: 'warning',
  done: 'success',
  canceled: 'primary',
  finished: 'success',
  open: 'secondary',
  closed: 'primary'
})

const COLORS_SITUATION = Object.freeze({
  active: 'success',
  disabled: 'light',
})

const COLORS_USE_NICKNAME = Object.freeze({
  yes: 'success',
  no: 'light',
})

export default {
  name: 'DynamicListPage',
  components: { DialogConfirmation, SearchListPage, Chip, ActionsListPage },
  props: {
    schema: {
      type: Object,
      required: true
    },
    service: {
      type: Object,
    },
    fixedFilter: {
      type: Boolean,
      default: false,
    },
    fixedFilterParams: {
      type: Object,
      default: () => {},
    }
  },
  inject: ['modeDark'],
  data() {
    return {
      icons: {
        search: search,
        view: view,
        destroy: destroy,
        dotsVertical: dotsVertical,
        filter: filter,
        cancel: cancel,
        check: check,
      },
      types: {
        typeSituation: typeSituation
      },
      selected: [],
      dialog: false,
      loading: false,
      loadingDestroy: false,
      searches: {},
      searchChips: [],
      headers: [],
      options: {},
      localItems: {},
      totalLocalItems: 10,
      noGetDynamicItems: false,
      chips: {},
      colorsStatus: COLORS_STATUS,
      colorsSituation: COLORS_SITUATION,
      colorsUseNickname: COLORS_USE_NICKNAME,
    }
  },
  mounted() {
    this.setHeaders();
  },
  watch: {
    options: {
      handler () {
        (this.searchChips.length || this.fixedFilter) ? this.searchItems(this.searches) : this.getAll() ;
      },
      deep: true,
    },
    fixedFilterParams: {
      handler() {
        this.searchItems(this.searches);
      },
      deep: true
    }
  },
  methods: {
    setHeaders() {
      this.schema.fields.forEach(form => {
        form.items.forEach(item => {
          if(item.list) {
            this.headers.push(
              {
                text: item.label,
                value: item.formattedName ? item.formattedName : item.name,
                align: item.align ? item.align : 'start',
                sortable: item.sortable ? item.sortable : true,
              }
            );
          }
        });
      });

      if(this.schema.listActions.status) {
        this.headers.push(
          {
            text: 'Status',
            value: 'status_formatted',
            align: 'start',
            sortable: true,
          }
        );
      }

      if(this.schema.listActions.situation) {
        this.headers.push(
          {
            text: 'Situação',
            value: 'situation_formatted',
            align: 'start',
            sortable: true,
          }
        );
      }
      
      if(this.schema.listActions.has) {
        this.headers.push({
          text: 'Ações',
          value: 'actions',
          sortable: false,
          align: 'end',
          cellClass: 'action-column',
        });
      }
    },
    getAll() {
      this.loading = true;

      const params = {
        page: this.options.page,
        totalItemsPerPage: this.options.itemsPerPage,
        customSearch: this.search,
      }

      this.service.index(params).then((res) => {
        this.localItems = res.data;
        this.totalLocalItems = res.data.total;
        this.loading = false;
        
        if(this.schema.business != undefined)
          this.schema.business.beforeList(this.localItems, this.schema);
      }).catch((err) => {
        console.error(`DynamicListPage GetDataFromApi error: ${err}`)
        this.loading = false;
        this.$noty.error('Erro ao receber os itens.');
      });
    },
    getFilters(payload) {
      payload = { ...payload, page: this.options.page, per_page: this.options.itemsPerPage }
      this.service.filters(payload).then((res) => {
        this.localItems = res.data;
        this.totalLocalItems = res.data.total;
        this.loading = false;
        
        if(this.schema.business != undefined)
          this.schema.business.beforeList(this.localItems, this.schema);
      }).catch((err) => {
        console.error(`DynamicListPage Filters error: ${err}`)
        this.loading = false;
        this.$noty.error('Erro ao receber os itens.');
      });
    },
    searchItems(search) {
      if(this.fixedFilter) search[this.fixedFilterParams.name] = { ...this.fixedFilterParams };

      this.searches = search;
      this.searchChips = [];
      let filter = {};
      Object.keys(search).forEach((key) => {
        filter[key] = search[key].value
        this.searchChips.push({ 
          name: search[key].name,
          label: search[key].label,
          value: search[key].value,
          formattedValue: search[key].formattedValue,
          noChip: search[key].noChip
        })
      })

      const payload = { params: { page: this.options.page, per_page: this.options.itemsPerPage }, filter, }
      this.getFilters(payload);
    },
    closeChip(value) {
      this.searchChips = this.searchChips.filter((item) => {
        if (item.name === value.name) this.$refs.searchListPage.localItem[item.name] = '';
        return item.name != value.name
      });

      let payload = {};
      this.searchChips.forEach((item) => {
        payload[item.name] = item;
      });

      this.searchItems(payload);
    },
    openDialogDestroy(item) {
      this.selected.push(item);
      this.dialog = true;
    },
    destroy() {
      if(!this.noGetDynamicItems){
        const { id } = this.selected[0].item;

        this.service.delete(id).then(() => {
          this.$noty.success('Registro excluído com sucesso!');
          this.loadingDestroy = false;
          this.getAll();
        }).catch((err) => {
          this.$noty.error(err);
        });

        this.clearProps();
      }else{
        this.loadingDestroy = true;
        this.clearProps();
      }
      this.clearProps();
    },
    clearProps() {
      this.selected = [];
      this.loadingDestroy = false;
      this.dialog = false;
    },
    actionMoreActions(item) {
      if(item.i.action === 'situation') {
        this.situation(item);
        return;
      }
      this.$emit('actionMoreActions', item);
    },
    situation(item) {
      this.loading = true;
      let situation = this.types.typeSituation[0].value;
      item.dataListProps.item.situation === this.types.typeSituation[0].value ? situation = this.types.typeSituation[1].value : situation = this.types.typeSituation[0].value;
      
      this.service.update(item.dataListProps.item.id, { situation: situation }).then(() => {
        this.getAll();
        this.loading = false;
      }).catch(() => {
        this.loading = false;
        this.$noty.error('Erro ao atualizar a situação.');
      });
    }
  }
}
</script>

<style lang="scss">
.action-column {
  right: 0px;
  position: sticky;
  padding: 0 5px !important;
  width: 100px;
}
</style>