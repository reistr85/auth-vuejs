<template>
  <v-menu v-bind="$attrs" :close-on-content-click="false" :activator="selectedElement" offset-x>
    <Card :color="selectedEvent.color" title="1" min-width="350px" toolbar icon dark>
      <template slot="toolbar">
        <h3 v-html="selectedEvent.name"></h3>
      </template>

      <div>
        Cliente: {{ selectedEvent.name }}
      </div>
    </Card>
  </v-menu>
</template>

<script>
import Card from '@/components/vuetify/Card';

export default {
  name: 'ToolbarEvent',
  components: { Card },
  props: {
    selectedElement: {
      required: true
    },
    selectedEvent: {
      required: true
    }
  }
};
</script>

<style>

</style>