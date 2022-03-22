<template>
  <v-card flat tile style="z-index: 3">
    <v-toolbar :dark="modeDark.value">
      <v-app-bar-nav-icon @click="$emit('openCloseSideBar')"></v-app-bar-nav-icon>
      <v-toolbar-title>Company</v-toolbar-title>
      
      <div class="ml-10">
        <Button label='Criar Agenda' rounded color='primary' class="mx-2" :icon="icons.plusOutline" @click="handleQuickMenu('calendar')" />
        <Button label='Agendamento' rounded color='primary' class="mx-2" :icon="icons.calendar" @click="handleQuickMenu('appointment')" />
      </div>

      <v-spacer></v-spacer>
      <VSwitch :label="modeDarkLocal.label" v-model="modeDarkLocal.value" class="mt-6 mr-5" @click="setModeDark()" />
      <NavBarSettings />
    </v-toolbar>
  </v-card>
</template>

<script>
import eventBus from '@/utils/eventBus';
import { dotsVertical, logout, calendar, plusOutline } from '@/utils/icons';
import Button from '@/components/vuetify/Button';
import VSwitch from '@/components/vuetify/VSwitch';
import AuthService from '@/views/Auth/services/AuthService';
import NavBarSettings from './NavBarSettings';

export default {
  name: 'NavBar',
  components: { Button, VSwitch, NavBarSettings },
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
        plusOutline: plusOutline,
      },
      dialog: false,
      modeDarkLocal: {
        label: 'Modo Escuro',
        value: false
      }
    };
  },
  watch: {
    ['modeDark.value']: {
      handler() {
        this.modeDarkLocal = this.modeDark;
      },
      deep: true,
    },
  },
  methods: {
    logout() {
      AuthService.logout().then(() => {
        window.location = `${process.env.VUE_APP_URL}/login`;
      }).catch(() => {

      });
    },
    handleQuickMenu(type) {
      eventBus.$emit('handleQuickMenu', { type });
    },
    setModeDark() {
      this.modeDarkLocal.value = !this.modeDarkLocal.value;
      this.$emit('setModeDark', this.modeDarkLocal);
    }
  }
};
</script>
