<template>
  <v-app>
    <div style="heigth: 100%" v-if="!isLoginRegisterPage">
      <NavBar :mode-dark="modeDark" @openCloseSideBar="openCloseSideBar" />
      
      <v-card height="100%" class="mt-0" :dark="modeDark.value">
        <div class="main">
          <SideBar ref="refsSideBar" />
          <ContentMain :mode-dark="modeDark" />
        </div>
      </v-card>
    </div>
    
    <div style="heigth: 100%" v-else>
      <router-view></router-view>
    </div>

    <div>
      <QuickMenu :dialog="dialogQuickMenu" :type="typeQuickMenu" />
    </div>
  </v-app>
</template>

<script>
import eventBus from '@/utils/eventBus';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ContentMain from './components/ContentMain';
import QuickMenu from './components/QuickMenu';

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    ContentMain,
    QuickMenu
  },
  data: () => ({
    appName: process.env.VUE_APP_NAME,
    modeDark: {
      value: false,
      label: 'Modo Escuro'
    },
    dialogQuickMenu: false,
    typeQuickMenu: null,
  }),
  mounted() {
    eventBus.$on('handleQuickMenu', this.handleQuickMenu)

    if (!localStorage.getItem(`${this.appName}.themeMode`)) localStorage.setItem(`${this.appName}.themeMode`, 'light')
    localStorage.getItem(`${this.appName}.themeMode`) === 'dark' ? this.modeDark.value = true : this.modeDark.value = false;
  },
  computed: {
    isLoginRegisterPage() {
      return this.$route.name === 'login' || this.$route.name === 'register'
    }
  },
  watch: {
    ['modeDark.value']() {
      if (this.modeDark.value) {
        this.modeDark.label = 'Modo Claro';
        localStorage.setItem(`${this.appName}.themeMode`, 'dark')
      }else{
        this.modeDark.label = 'Modo Escuro';
        localStorage.setItem(`${this.appName}.themeMode`, 'light')
      }
    },
  },
  methods: {
    openCloseSideBar() {
      this.$refs.refsSideBar.drawerEvent();
    },
    handleQuickMenu(data) {
      this.typeQuickMenu = data.type;
      this.dialogQuickMenu = !this.dialogQuickMenu;
    }
  },
  beforeDestroy() {
    eventBus.$off('handleQuickMenu')
  }
};
</script>

<style scope>
.main {
  height: 100%;
  display: flex;
  width: 100%;
}
</style>