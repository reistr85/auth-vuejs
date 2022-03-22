<template>
  <v-expansion-panels 
    v-bind="$attrs"
    v-on="$listeners"
    :multiple="multiple"
    :focusable="focusable"
    :readonly="readonly">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h3><Icon :icon="icon" class="mr-3" /> {{ title }}</h3>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Icon from '@/components/vuetify/Icon';

export default {
  name: 'ExpansionPanel',
  components: { Icon },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    focusable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    }
  },
};
</script>

<style>

</style>