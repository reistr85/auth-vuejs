<template>
  <v-navigation-drawer  permanent elevation="1" height="100%">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="mx-auto" max-width="300" heigth="100%" style="height: 100%;" elevation="0" tile>
      <v-list dense>
        <v-list-group v-model="item.active" v-for="item in items" :key="item.title" :prepend-icon="item.action" no-action dense class="mt-2">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title" link @click="menuNavigator(child)">
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      items: [
        {
          active: true,
          action: 'mdi-ticket',
          items: [{ title: 'Dashboard', route: 'home' }],
          title: 'Início',
        },
        {
          active: false,
          action: 'mdi-ticket',
          items: [{ title: 'Listar Usuários', route: 'users' }],
          title: 'Usuários',
        },
      ],
    }
  },
  methods: {
    menuNavigator(item) {
      this.$router.push({ name: item.route })
    }
  }
}
</script>

<style>

.v-list-item--active {
  border-left: 3px solid red;
}
.item-active {
  background: #ebebeb !important;
}

</style>