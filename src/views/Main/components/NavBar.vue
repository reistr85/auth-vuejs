<template>
  <v-card flat tile style="z-index: 999">
    <v-toolbar :dark="modeDark.value">
      <v-app-bar-nav-icon @click="$emit('openCloseSideBar')"></v-app-bar-nav-icon>
      <v-toolbar-title>Company</v-toolbar-title>
      
      <div class="ml-10">
        <Button label='Agendamento' rounded color='primary' :icon="icons.calendar" />
      </div>

      <v-spacer></v-spacer>
      <VSwitch :label="modeDark.label" class="mt-6 mr-5" @click="modeDark.value = !modeDark.value" />
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

    <Dialog dialog :maxWidth="parseInt(1000)" no-title>
      <div slot="content" class="content-appointments">
        <Wizard />
        
      </div>
    </Dialog>
  </v-card>
</template>

<script>
import { dotsVertical, logout, users, industry, calendar } from '@/utils/icons';
import Menu from '@/components/vuetify/Menu';
import Button from '@/components/vuetify/Button';
import VSwitch from '@/components/vuetify/VSwitch';
import Dialog from '@/components/vuetify/Dialog';
import AuthService from '@/views/Auth/services/AuthService';
import Wizard from '@/views/Operations/Appointments/components/Wizard';

export default {
  name: 'NavBar',
  components: { Menu, Button, VSwitch, Dialog, Wizard },
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
        calendar: calendar,
      },
      items: [
        {icon: industry, label: 'Empresa', route: 'companies'},
        {icon: users, label: 'Usuários', route: 'users'},
      ],
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
