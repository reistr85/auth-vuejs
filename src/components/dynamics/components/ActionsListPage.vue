<template>
  <div style="width: 100px;">
    <v-menu :disabled="dataListProps.item.disableMoreActions" :nudge-width="200" bottom left offset-y v-if="schema.listActions.more.has">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>{{ icons.dotsVertical }}</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list dense v-if="schema.listActions.situation">
          <v-list-item link @click="$emit('actionMoreActions', { dataListProps, i: { action: 'situation' } })">
            <v-list-item-icon>
              <v-icon class="icon-side-bar">{{ icons.check }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-side-bar">{{getLabelSituation(dataListProps.item.situation)}}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-for="(i, index) in schema.listActions.more.items" :key="index" dense>
          <v-list-item link @click="$emit('actionMoreActions', { dataListProps, i })">
            <v-list-item-icon>
              <v-icon class="icon-side-bar">{{ i.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-side-bar">{{ i.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-btn v-if="!schema.listActions.noShow" icon class="my-1" fab color="secondary" x-small
      :to="{ name: routeName, params: { id: dataListProps.item.id } }">
      <v-icon dark>{{ icons.view }}</v-icon>
    </v-btn>

    <v-btn icon v-if="!schema.listActions.noDestroy" class="my-1" fab color="red" x-small
      :disabled="dataListProps.item.destroyDisabled"
      @click="$emit('openDialogDestroy', dataListProps)">
      <v-icon dark>{{ icons.destroy }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ActionsListPage',
  props: {
    schema: {
      type: Object,
      required: true,
    },
    dataListProps: {
      type: Object,
      required: true,
    },
    icons: {
      type: Object,
      required: true,
    }
  },
  computed: {
    routeName () {
      return this.$route.meta.typeAllType ? this.schema.routes[this.$route.meta.typeAllType].show.name :
        this.schema.routes.show.name;
    }
  },
  methods: {
    getLabelSituation (situationItem) {
      return situationItem === this.$enums.situation.ACTIVE ? 'Desativar' : 'Ativar';
    }
  }
};
</script>
