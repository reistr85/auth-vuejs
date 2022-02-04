<template>
  <v-data-table
    v-model="selected"
    item-key="id"
    class="datatable"
    dense
    :loading="loading"
    :headers="headers"
    :items="items"
    :options.sync="options"
    :server-items-length="totalLocalItems"
    :single-select="singleSelect"
    :show-select="showSelect"
    :hide-default-header="hideDefaultHeader"
    :hide-default-footer="hideDefaultFooter"
    @click:row="clickRow">
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
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
      type: Array,
      default: () => [],
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
      selected: [],
      options: {},
      localItems: [],
      totalLocalItems: 0,
    }
  },
  watch: {
    items: {
      handler() {
        this.totalLocalItems = this.items.length;
      },
      deep: true,
    }
  },
  methods: {
    clickRow(data) {
      this.selected = [data]
    }
  }
}
</script>

<style lang="scss" scoped>
.datatable {
  width: 100%;
}
</style>