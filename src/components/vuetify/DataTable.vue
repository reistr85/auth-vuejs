<template>
  <div>
    <TextField
      v-model="search"
      label='pesquisar'
      class="content-appointments--boddy---right----customers-----search-customer" />

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
      @input="handleAction">
    </v-data-table>
  </div>
</template>

<script>
import _ from 'lodash';
import TextField from '@/components/vuetify/TextField';

export default {
  name: 'DataTable',
  components: { TextField },
  props: {
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
      localItems: [],
      totalLocalItems: 0,
    }
  },
  watch: {
    items: {
      handler() {
        this.localItems = this.items.data;
        this.totalLocalItems = this.items.total;
        this.options.itemsPerPage = parseInt(this.items.per_page);
      },
      deep: true,
    },
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
  methods: {
    getItems() {
      this.$emit('getItems', { options: this.options, search: this.search })
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