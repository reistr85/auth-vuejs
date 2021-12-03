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
    modeDark: {
      value: false,
      label: 'Modo Escuro'
    },
  }),
  watch: {
    ['modeDark.value']() {
      this.modeDark.value ? this.modeDark.label = 'Modo Claro' : this.modeDark.label = 'Modo Escuro';
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