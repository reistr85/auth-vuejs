<template>
  <div>
    <div class="mb-5">
      <TextField v-model="search" label="Pesquisar" :append-icon="icons.search" />
    </div>

    <v-data-table
      v-model="selected"
      item-key="id"
      dense
      :loading="loading"
      :search="search"
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
import { search, view, destroy, dotsVertical } from '@/utils/icons';
import TextField from '@/components/vuetify/TextField';
import DialogConfirmation from '@/components/DialogConfirmation';

export default {
  name: 'DynamicListPage',
  components: { TextField, DialogConfirmation },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icons: {
        search: search,
        view: view,
        destroy: destroy,
        dotsVertical: dotsVertical
      },
      selected: [],
      dialog: false,
      loading: false,
      loadingDestroy: false,
      search: '',
      headers: [
        {}
      ],
      localItems: {
        data: [
          {
            id: 1,
            name: 'Renan Reis',
            email: 'reistr85@gmail.com',
            type_formatted: 'Administrador'
          }
        ]
      },
      options: {},
      totalLocalItems: 10,
    }
  },
  mounted() {
    this.setHeaders();
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
    openDialogDestroy(item) {
      this.selected.push(item);
      this.dialog = true;
    },
    destroy() {
      this.loadingDestroy = true;
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