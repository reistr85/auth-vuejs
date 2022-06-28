<template>
  <div>
    <div class="mb-3">
      <slot name="custom-header" />
    </div>

    <div class="mb-5 d-flex justify-space-between">
      <div class="d-flex flex-wrap  justify-start">
        <div v-for="(item, index) in searchChips" :key="index">
          <Chip
            v-if="!item.noChip"
            dense
            close
            class="mr-2"
            :label="`${item.label}: ${item.formattedValue}`"
            @click:close="$emit('closeChip', item)" />
        </div>
      </div>

      <div>
        <SearchListPage ref="searchListPage" :items="schema.filters.items" v-if="schema.filters.has" @searchItems="searchItems" />
      </div>
    </div>
  </div>
</template>

<script>
import Chip from '@/components/vuetify/Chip';
import SearchListPage from './SearchListPage';

export default {
  name: 'DynamicListPageHeader',
  components: { Chip, SearchListPage },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    searchChips: {
      type: Array,
      required: true,
    }
  },
  methods: {
    searchItems (form) {
      this.$emit('searchItems', form);
    }
  }
};
</script>

<style>

</style>