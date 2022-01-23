<!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <div class="mb-5 d-flex justify-space-between">
      <div class="d-flex flex-wrap  justify-start">
        <Chip 
          dense
          v-for="(item, index) in searches" :key="index"
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
      dense
      :loading="loading"
      :headers="headers"
      :items="localItems.data"
      :options.sync="options"
      :server-items-length="totalLocalItems"
      :single-select="schema.singleSelect"
      :show-select="schema.checkItem"
      class="elevation-1">
      <template v-slot:[`item.actions`]="props">
        <div style="min-width: 70px;">
          <v-menu :disabled="props.item.disableMoreActions" :nudge-width="200" bottom left offset-y v-if="schema.listActions.more.has">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>{{ icons.dotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-list v-for="(i, index) in schema.listActions.more.items" :key="index" dense>
                <v-list-item link @click="actionMoreActions(props, i)">
                  <v-list-item-icon>
                    <v-icon class="icon-side-bar">{{ i.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="text-side-bar">{{ i.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <v-btn icon v-if="!schema.listActions.noShow" class="my-1" fab color="secondary" x-small :to="{name: schema.routes.show.name, params: {id: props.item.id}}">
            <v-icon dark>{{ icons.view }}</v-icon>
          </v-btn>
          
          <v-btn icon v-if="!schema.listActions.noDestroy" class="my-1" fab color="red" x-small @click="openDialogDestroy(props)">
            <v-icon dark>{{ icons.destroy }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <DialogConfirmation :dialog="dialog" :loading="loadingDestroy" @noAction="clearProps" @yesAction="destroy" />
  </div>
</template>

<script>
import { search, view, destroy, dotsVertical, filter, cancel } from '@/utils/icons';
import DialogConfirmation from '@/components/DialogConfirmation';
import SearchListPage from './components/SearchListPage';
import Chip from '@/components/vuetify/Chip';

export default {
  name: 'DynamicListPage',
  components: { DialogConfirmation, SearchListPage,Chip },
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

      if(this.schema.listActions.has) {
        this.headers.push({ text: 'Ações', value: 'actions', sortable: false, align: 'end'});
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
          // this.$noty.success('Registro excluído com sucesso!');
          this.loadingDestroy = true;
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
    actionMoreActions(item, index) {
      console.log(item, index)
    }
  }
}
</script>

<style>

</style>