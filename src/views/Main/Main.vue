<template>
  <v-app>
    <NavBar :mode-dark="modeDark" />
    
    <v-card height="100%" class="mt-0" :dark="modeDark.value">
      <div class="main">
        <SideBar />
        <ContentMain :mode-dark="modeDark" />
      </div>
    </v-card>

  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import ContentMain from './components/ContentMain'

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    ContentMain
  },
  data: () => ({
    appName: process.env.VUE_APP_NAME,
    modeDark: {
      value: false,
      label: 'Modo Escuro'
    },
  }),
  mounted() {
    if (!localStorage.getItem(`${this.appName}.themeMode`)) localStorage.setItem(`${this.appName}.themeMode`, 'light')
    localStorage.getItem(`${this.appName}.themeMode`) === 'dark' ? this.modeDark.value = true : this.modeDark.value = false;
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
    }
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