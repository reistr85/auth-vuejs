<template>
  <v-menu v-model="menu" :nudge-width="600" bottom left offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>{{ icons.filter }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h3>Filtro de pesquisa</h3>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col :md="item.md" v-for="(item, index) in items" :key="index">
            <TextField v-model="search" :label="item.label" />
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
import { search, filter } from '@/utils/icons';
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'SearchListPage',
  components: { TextField },
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
      },
      menu: false,
      search: '',
    }
  },
  methods: {
    clearFilters() {
      this.search = '';
      this.menu = false;
    }
  }
}
</script>

<style>

</style>