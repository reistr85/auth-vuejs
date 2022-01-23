<template>
  <v-menu v-model="menu" :max-width="650" bottom left offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <Button v-bind="attrs" v-on="on" label="FILTROS" text :icon="icons.filter" @click="clearFilters" />
    </template>

    <v-card>
      <v-card-title>
        <h3>Filtro de pesquisa</h3>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col :md="item.md" v-for="(item, index) in items" :key="index">
            <component 
              :is="getComponent(item)"
              v-bind="getPropsComponent(item)"
              v-model="localItem[item.name]"
              @change="setFormValue(item, $event)"
              @keyup.enter="$emit('searchItems', form), menu = false" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-4 py-4 d-flex justify-end">
        <!-- <Button label="Limpar" text color="primary" @click="clearFilters" /> -->
        <Button label="Pesquisar" color="primary" :icon="icons.search" @click="$emit('searchItems', form), menu = false" />
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import _ from 'lodash';
import { search, filter, text } from '@/utils/icons';
import TextField from '@/components/vuetify/TextField';
import Select from '@/components/vuetify/Select';
import Button from '@/components/vuetify/Button';
import DataPicker from '@/components/vuetify/DataPicker';

const TYPES_COMPONENT = Object.freeze({
  text: TextField,
  select: Select,
  dataPicker: DataPicker,
})

export default {
  name: 'SearchListPage',
  components: { Button },
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
      form: {},
      localItem: {}
    }
  },
  methods: {
    getComponent(item) {
      item
      return TYPES_COMPONENT[item.type];
    },
    getPropsComponent(item) {
      return { label: item.label, items: [], icon: item.icon }
    },
    setFormValue(field, value) {
      _.set(this.form, field.name, { name: field.name, label: field.label, value: value});
    },
    clearFilters() {
      // this.form = '';
      // this.menu = false;
      // this.$emit('searchItems', this.form);
    }
  }
}
</script>

<style>

</style>