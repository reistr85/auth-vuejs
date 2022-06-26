<template>
  <v-card flat tile style="z-index: 3">
    <v-toolbar :dark="modeDark.value">
      <v-app-bar-nav-icon @click="$emit('openCloseSideBar')"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ nameCompany }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <CustonSwitch :label="modeDarkLocal.label" v-model="modeDarkLocal.value" class="mt-6 mr-5" @click="setModeDark()" />
      <NavBarSettings />
    </v-toolbar>
  </v-card>
</template>

<script>
import CustonSwitch from '@/components/vuetify/CustonSwitch';
import NavBarSettings from './NavBarSettings';

export default {
  name: 'NavBar',
  components: { CustonSwitch, NavBarSettings },
  props: {
    modeDark: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
      modeDarkLocal: {
        label: 'Modo Escuro',
        value: false
      }
    };
  },
  computed: {
    nameCompany () {
      return process.env.VUE_APP_COMPANY;
    }
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
    setModeDark() {
      this.modeDarkLocal.value = !this.modeDarkLocal.value;
      this.$emit('setModeDark', this.modeDarkLocal);
    }
  }
};
</script>
