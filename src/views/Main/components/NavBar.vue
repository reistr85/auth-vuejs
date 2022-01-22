<template>
  <v-card flat tile style="z-index: 999">
    <v-toolbar :dark="modeDark.value">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Company</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="modeDark.value" :label="modeDark.label" class="mt-6 mr-5"></v-switch>
      <Menu :width="200">

        <h3>Salão de Beleza Mais</h3>
        <p>reistr85@gmail.com</p>
        <v-divider class="mb-"></v-divider>

        <v-list dense>
          <v-list-item link v-for="(item, index) in items" :key="index" @click="$router.push({ name: item.route })">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-action>{{ item.label }}</v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider class="mb-5"></v-divider>

        <Button label="Sair" color="secondary" style="width: 100%" :icon="icons.logout" @click="logout()" />
      </Menu>
    </v-toolbar>
  </v-card>
</template>

<script>
import { dotsVertical, logout, users } from '@/utils/icons';
import Menu from '@/components/vuetify/Menu';
import Button from '@/components/vuetify/Button';
import AuthService from '@/views/Auth/services/AuthService';

export default {
  name: 'NavBar',
  components: { Menu, Button },
  props: {
    modeDark: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
      icons: {
        dotsVertical: dotsVertical,
        logout: logout,
      },
      items: [
        {icon: logout, label: 'Empresa', route: 'companies'},
        {icon: users, label: 'Usuários', route: 'users'},
      ]
    }
  },
  methods: {
    logout() {
      AuthService.logout().then(() => {
        window.location = `${process.env.VUE_APP_URL}/login`
      }).catch(() => {

      })
    }
  }
}
</script>

<style>

</style>