<!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <div class="mb-5 d-flex justify-space-between">
      <div class="d-flex flex-wrap  justify-start">
        <Chip 
          v-for="(item, index) in searches" :key="index"
          dense
          close
          class="mr-2"
          :label="`${item.label}: ${item.formattedValue}`" 
          @click:close="closeChip(item)" />
      </div>
      <div>
        <SearchListPage ref="searchListPage" :items="schema.filters.items" v-if="schema.filters.has" @searchItems="searchItems" />
      </div>
    </div>

    <v-data-table
      v-model="selected"
      item-key="id"
      class="elevation-1 certus-data-list"
      dense
      :loading="loading"
      :headers="headers"
      :items="localItems.data"
      :options.sync="options"
      :server-items-length="totalLocalItems"
      :single-select="schema.singleSelect"
      :show-select="schema.checkItem">

      <!-- <template v-slot:body="props">
        <tr v-for="(index, i) in props.items" :key="i">
          <td v-for="(header, h) in headers" :key="h" class="text-left font-weight-black">
            {{ index[header.value]}}
          </td>
        </tr>
      </template> -->

      <template v-slot:[`item.use_nickname_formatted`]="{ item }">
        <Chip :label="item.use_nickname_formatted" small :color="item.use_nickname === 'yes' ? 'success' : 'light'" />
      </template>

      <template v-slot:[`item.situation_formatted`]="{ item }">
        <Chip :label="item.situation_formatted" small :color="item.situation === 'active' ? 'success' : 'light'" />
      </template>

      <template v-slot:[`item.actions`]="props" style="width: 200px">
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
  },
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
      searches: '',
      headers: [],
      localItems: {},
      options: {},
      totalLocalItems: 10,
      noGetDynamicItems: false,
      chips: {}
    }
  },
  mounted() {
    this.setHeaders();
    this.getAll();
  },
  watch: {
    options: {
      handler () {
        this.getAll();
      },
      deep: true,
    },
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
        this.headers.push({ text: 'Ações', value: 'actions', sortable: false, align: 'end', class: 'action-column-header', cellClass: 'action-column',});
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
    getFilters() {
      this.loading = true;

      const params = {
        page: this.options.page,
        relations: this.schema.filters.relations,
        totalItemsPerPage: this.options.itemsPerPage,
        customSearch: this.search,
      }

      this.service.filters(params, this.searches).then((res) => {
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
    searchItems(search) {
      this.searches = [];
      this.searches = Object.keys(search)
        .filter((item) =>  search[item].value)
        .map((item) => {
          return {
            domain: this.schema.domain,
            name: search[item].name,
            label: search[item].label,
            value: search[item].value,
            formattedValue: search[item].formattedValue,
          }
        })

      this.getFilters();
    },
    closeChip(value) {
      this.searches = this.searches.filter((item) => {
        if (item.name === value.name) this.$refs.searchListPage.localItem[item.name] = '';
        return item.name != value.name
      });

      this.getFilters();
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
.action-column, .action-column-header {
  right: 0px;
  position: sticky;
  background-color: #fff;
  padding: 0 5px !important;
  width: 100px;
}
</style>