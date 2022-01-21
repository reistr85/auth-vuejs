<template>
  <v-menu v-model="menu" :max-width="650" bottom left offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        FILTROS <v-icon class="ml-3">{{ icons.filter }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h3>Filtro de pesquisa</h3>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col :md="item.md" v-for="(item, index) in items" :key="index">
            <component :is="getComponent(item)" v-model="search" v-bind="getPropsComponent(item)" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-4 py-4 d-flex justify-end">
        <v-btn text color="primary" @click="clearFilters">
          Limpar
        </v-btn>

        <v-btn color="primary" @click="$emit('searchItems', search), menu = false">
          <v-icon>{{ icons.search }}</v-icon>
          Pesquisar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { search, filter, text } from '@/utils/icons';
import TextField from '@/components/vuetify/TextField';
import Select from '@/components/vuetify/Select';
import DataPicker from '@/components/vuetify/DataPicker';

const TYPES_COMPONENT = Object.freeze({
  text: TextField,
  select: Select,
  dataPicker: DataPicker,
})

export default {
  name: 'SearchListPage',
  components: {},
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      icons: {
        search: search,
        filter: filter,
        text: text,
      },
      menu: false,
      search: '',
      textField: TextField,
    }
  },
  methods: {
    getComponent(item) {
      item
      return TYPES_COMPONENT[item.type];
    },
    getPropsComponent(item) {
      return { icon: this.icons.text, label: item.label, items: [] }
    },
    clearFilters() {
      this.search = '';
      this.menu = false;
    }
  }
}
</script>

<style>

</style>