<template>
  <div class="content-main" style="">
    <div class="content-main-title">
      <div>
        <p class="title">Listar Contas</p>
        <h3 class="subtitle-1">Contas</h3>
        <h5 class="subtitle-2">Crie uma conta para seu cliente poder gerenciar os domínios e e-mail, além de administrar sites.</h5>
      </div>

      <div>
        <v-btn color="primary" class="white--text">
          <v-icon left dark>mdi-plus-circle-outline</v-icon>
          NOVA CONTA
        </v-btn>
      </div>
    </div>
    <v-divider class="my-5"></v-divider>

    <v-card class="mt-2 py-3 px-3" :color="modeDark.value ? '#333' : ''" elevation="2" min-height="500">d</v-card>

    <p class="text-caption text-center mt-5" color="#F44336" x-small>Todos os direitos reservados à MGE Tech - Siscomge - 2021</p>
  </div>
</template>

<script>
export default {
  name: 'ContentMain',
  props: {
    modeDark: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scope>

.content-main {
  height: 100%;
  width: 95%;
  padding: 50px 50px 0 50px;
}

.content-main-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>