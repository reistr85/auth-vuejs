<template>
  <div>
    <v-row>
      <v-col v-if="!noSearch">
        <TextField
          v-model="search"
          label='pesquisar'
          class="content-appointments--boddy---right----customers-----search-customer" />
      </v-col>
      <v-col>
        <slot name="custom-header" />
      </v-col>
    </v-row>

    <v-data-table
      v-model="selected"
      item-key="id"
      class="datatable"
      dense
      :loading="loading"
      :search="search"
      :headers="headers"
      :items="localItems"
      :options.sync="options"
      :server-items-length="totalLocalItems"
      :single-select="singleSelect"
      :show-select="showSelect"
      :hide-default-header="hideDefaultHeader"
      :hide-default-footer="hideDefaultFooter"
      @click:row="clickRow"
      @input="handleAction" />
  </div>
</template>

<script>
import _ from 'lodash';
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'DataTable',
  components: { TextField },
  props: {
    noSearch: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Object,
      default: () => {},
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    hideDefaultHeader: {
      type: Boolean,
      default: false,
    },
    hideDefaultFooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      selected: [],
      options: {},
    }
  },
  watch: {
    options: {
      handler() {
        this. getItems();
      },
      deep: true,
    },
    search: _.debounce(function() {
      this.options.page = 1;
      this. getItems();
    }, 700)
  },
  computed: {
    localItems: {
      get() {
        return this.items.data;
      },
      set(value) {
        this.localItems = value;
      }
    },
    totalLocalItems: {
      get() {
        return this.items.total;
      },
      set(value) {
        this.items = value;
      }
    }
  },
  methods: {
    getItems() {
      this.$emit('getItems', {
        ...this.options,
        per_page: this.options.itemsPerPage,
        filter: this.search,
        search_global: true
      })
    },
    handleAction() {
      this.$emit('selected', this.selected)
    },
    clickRow(data) {
      if(this.singleSelect) {
        this.selected.length && data.id === this.selected[0].id ? this.selected = [] :  this.selected = [data]
      }else{
        const filter = this.selected.find((item) => {
          return item.id === data.id;
        });

        if(!filter) {
          this.selected.push(data)
        }else{
          this.selected.forEach((item, index) => {
            if(item.id === data.id) {
              this.selected.splice(index, 1);
            }
          });
        }
      }
      this.$emit('selected', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
.datatable {
  width: 100%;
}
</style>