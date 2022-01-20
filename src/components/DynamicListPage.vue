<template>
  <div class="dynamic-list-page mb-10">
    <v-row>
      <v-col align="start">
        <v-menu
          v-if="schema.routes.list.children"
          v-model="menu"
          :close-on-content-click="false"
          offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-2"
              small
              color="primary"
              dark
              v-bind="attrs"
              v-on="on">
              Ações
            </v-btn>
          </template>

          <v-card>
            <v-card-text>
              <v-row>
              <v-col class="py-5 px-5">
                <v-btn 
                  small
                  class="primary mr-2" 
                  v-for="(item, index) in schema.routes.list.children" :key="index" 
                  :to="item.path">
                  {{item.label}}
                </v-btn>
              </v-col>
            </v-row>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>

    <section class="mt-5 mb-5 content-items-header">
      <div class="content-items-header--item" v-if="!schema.noSearch" :md="schema.searchCol || ''">
        <v-text-field
          outlined
          dense
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          hide-details>
        </v-text-field>
      </div>
      <div class="content-items-header--item" v-if="!schema.noBetween" :md="schema.betweenCol || ''">
        <DataPick 
          :model="dateInitial"
          outlined
          dense
          no-icon
          model-name="dateInitial"
          id="dateInitial"
          :no-initial="noInitialBetween"
          @changeDataPick="changeDataPick"
          label="Data Inicial" />
      </div>
      <div class="content-items-header--item" v-if="!schema.noBetween" :md="schema.betweenCol || ''">
        <DataPick 
          :model="dateFinal"
          outlined
          dense
          no-icon
          model-name="dateFinal"
          id="dateFinal"
          :no-initial="noInitialBetween"
          @changeDataPick="changeDataPick"
          label="Data Final" />
      </div>
      <div class="content-items-header--item" v-for="(item, index) in itemsEquals" :key="index" :md="schema.equalsCol || ''">
        <div v-if="!schema.noEquals && !schema.hideInputEquals">
          <v-select 
            v-model="typeEqualSelected[item.name]" 
            @change="changeInitialItem(item.name, typeEqualSelected[item.name])"
            outlined
            dense
            hide-details="auto"
            :items="item.items" 
            :label="item.label">
          </v-select>
        </div>
      </div>
    </section>

    <section v-if="schema.preferencesParams" class="mt-5 content-items-header">
      <div class="content-items-header--item" v-for="(item, index) in schema.preferencesParams" :key="index">
        <v-switch
          v-model="item.model"
          :label="item.label"
          @change="changePreferencesParams(item)"
        ></v-switch>
      </div>
    </section>

    <v-row>
      <v-col>
        <slot name="custom-header" />
      </v-col>
    </v-row>
    <div class="datatable-print" id="datatable-print">
      <v-data-table
          v-model="selected"
          item-key="id"
          dense
          :id="id"
          :loading="loading"
          :search="search"
          :headers="headers"
          :items="localItems.data"
          :options.sync="options"
          :server-items-length="totalLocalItems"
          :single-select="schema.singleSelect"
          :show-select="schema.checkItem"
          class="elevation-1"
        >
          <template v-slot:top v-if="!schema.singleSelect">
            <v-switch
              v-model="singleSelect"
              label="Single select"
              class="pa-3"
            ></v-switch>
          </template>

          <template v-slot:[`item.actions`]="props">
            <div style="min-width: 70px;">
              <v-menu :disabled="props.item.disableMoreActions" :nudge-width="200" bottom left offset-y v-if="schema.moreActions">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list v-for="(i, index) in schema.moreActions" :key="index" dense>
                    <v-list-item link :disabled="getDisableItemMoreActions(props.item, i)" @click="moreActions(props, i)">
                      <v-list-item-icon>
                        <v-icon :disabled="getDisableItemMoreActions(props.item, i)" class="icon-side-bar">{{ i.icon }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="text-side-bar">{{ i.label }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>

              <v-btn icon v-if="schema.show && !disabledAllBtns" :disabled="props.item.disableShow" class="my-1" fab color="primary" 
                x-small :to="{name: schema.routes.show.name, params: {id: props.item.id}}">
                <v-icon dark>mdi-eye</v-icon>
              </v-btn>
              
              <v-btn icon v-if="schema.destroy && !disabledAllBtns" :disabled="props.item.disableDelete" 
                class="my-1" fab color="red" :dark="!props.item.disableDelete" x-small @click="openDialogDestroy(props)">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
      </v-data-table>
    </div>
      
    <v-row class="mt-5 custom-footer">
      <v-col v-for="(item, index) in schema.footer" :key="index" :md="item.md">
        <div :class="item.class">
          <h3>{{ item.label }}</h3>
          <h3>{{localItems[item.name]}}</h3>
        </div>
      </v-col>
    </v-row>

    <DialogDestroy :dialog="dialog" @noAction="clearProps" @yesAction="destroy" />
  </div>
</template>

<script>
import DialogDestroy from '@/components/DialogDestroy';
import { debounce } from "@/plugins/debounce.js";
import DataPick from '@/components/DataPick';

export default {
  name: 'DynamicListPage',
  components: {
    DialogDestroy,
    DataPick,
  },
  props: {
    schema: {
      type: Object,
      default: () => {}
    },
    service: {
      type: Object,
    },
    items: {
      type: Object,
      default: () => {}
    },
    noGetDynamicItems: {
      type: Boolean,
      default: false
    },
    disabledAllBtns: {
      type: Boolean,
      default: false
    },
    externalHeaders: {
      type: Array,
      default: () => {}
    },
    itemsEquals: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: 'content-data-list'
    },
    initItemEqual: {
      type: Array,
      default: () => {}
    },
    filters: {
      type: Boolean,
      default: false,
    },
    noInitialBetween: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      loading: false,
      singleSelect: false,
      search: '',
      customSearch: '',
      selected: [],
      headers: [],
      dialog: false,
      localItems: {},
      totalLocalItems: 0,
      menu: false,
      options: {},
      dateInitial: this.noInitialBetween ? null : new Date().toISOString().substr(0, 10),
      dateFinal: this.noInitialBetween ? null: new Date().toISOString().substr(0, 10),
      typeEqualSelected: {},
      switch1: true,
    }
  },
  mounted() {
    this.setHeaders();
    if(this.initItemEqual){
      this.initItemEqual.forEach((item) => {
        this.typeEqualSelected[item.name] = item.value;
      });
    }
  },
  watch: {
    search: debounce(function (search) {
      this.search = search;
      this.options.page = 1;
      this.getFilters();
    }, 1000),
    options: {
      handler () {
        if((this.search == '' && !this.schema.filtersParams)){
          this.getDataFromApi();
          return;
        }

        this.getFilters();
      },
      deep: true,
    },
    selected() {
      this.$emit('selectedItem', this.selected);
    },
    initItemEqual() {
      this.initItemEqual.forEach((item) => {
        this.typeEqualSelected[item.name] = item.value;
      });
      this.getFilters();
    },
  },
  methods: {
    getDataFromApi () {
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
      let paginate = `page=${this.options.page}&per_page=${this.options.itemsPerPage}`
      let ordering = null
      let q = []

      if(this.schema.filtersParams) {
        ordering ={
          column: this.schema.filtersParams.ordering.column,
          value: this.schema.filtersParams.ordering.value,
        }

        Object.keys(this.schema.filtersParams).forEach((item) => {
          if(item === 'between'){
            q.push({ 
              type: this.schema.filtersParams.between.type,
              column: this.schema.filtersParams.between.column,
              date_initial: this.dateInitial,
              date_final: this.dateFinal,
            });
          }else if(item === 'equals' && this.typeEqualSelected != ''){
            Object.keys(this.typeEqualSelected).forEach((item) => {
              q.push({ 
                type: this.schema.filtersParams.equals.type,
                column: item,
                value: this.typeEqualSelected[item]
              });
            });
          }
        });
      }
      
      const params = {
        domain: this.schema.domain,
        page: this.options.page,
        search: this.search,
        ordering,
        q,
      }

      this.service.filters(params, paginate).then((res) => {
        this.localItems = res.data;
        this.totalLocalItems = res.data.total;
        this.loading = false;

        if(this.schema.business != undefined)
          this.schema.business.beforeList(this.localItems, this.schema);
      }).catch((err) => {
        console.error(`DynamicListPage GetFilters error: ${err}`)
        this.loading = false;
        this.$noty.error('Erro ao receber os itens.');
      });
    },
    setHeaders() {
      if(this.externalHeaders){
        this.headers = this.externalHeaders;
        return;
      }

      if(this.schema.fields[0].title){
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
      }else{
        // só existe para manter a compatibilidade com os antigos Schemas
        // é preciso refatorar todos os Schemas para o padrão do CompanySchema
        // depois de refatorar pode ser excluído
        this.schema.fields.forEach(item => {
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
      }

      if(this.schema.show || this.schema.destroy || this.schema.moreActions.length)
        this.headers.push({ text: 'Ações', value: 'actions', sortable: false, align: 'end'});
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
          this.getDataFromApi();
        }).catch((err) => {
          this.$noty.error(err);
        });

        this.clearProps();
      }else{
        this.$emit('removeItem', {index: this.selected[0].index, item: this.selected[0].item})
        this.clearProps();
      }
    },
    clearProps() {
      this.selected = [];
      this.dialog = false;
    },
    changeDataPick({model, date}) {
      this[model] = date;
      this.options.page = 1;
      this.getFilters();
      this.$emit('eventDataPick', {model, date});
    },
    changeInitialItem(name, value) {
      this.typeEqualSelected[name] = value;
      this.getFilters();
    },
    getDisableItemMoreActions(item, option) {
      let res = false;
      if(item.disableItemMoreActions){
        Object.keys(item.disableItemMoreActions).forEach((i) => {
          if(i === option.name){
            res = true;
          }
        });
      }

      return res;
    },
    moreActions(props, i) {
      this.$emit('moreActions', {item: props.item, action: i.action});
    },
    changePreferencesParams(item) {
      if(!item.model){
        this.getFilters();
        return;
      }
      
      const filter_params = {
        search: this.search,
        between: {dateInitial: this.dateInitial, dateFinal: this.dateFinal},
        equals: this.itemsEquals,
        ordering: this.ordering 
      }
      
      this.schema.business.preferencesParams(this.localItems, item, filter_params);
    }
  }
}
</script>

<style lang="scss">
.perPage {
  width: 150px;
}

.v-pagination {
  justify-content: flex-end !important;
}

.v-input__control {
  // flex-direction: row !important;
  // flex-wrap: nowrap !important;
}

.content-items-header {
  display:flex;
  justify-content: flex-start;

  .content-items-header--item {
    margin: 0 10px 0 0
  }

  .content-items-header--item:last-child {
    margin: 0
  }
}

.v-text-field__details {
  padding: 0 !important;
}
</style>