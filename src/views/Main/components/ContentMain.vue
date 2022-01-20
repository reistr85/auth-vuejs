<template>
  <div class="content-main" style="">
    <router-view></router-view>
    <p class="text-caption text-center mt-5" x-small>Todos os direitos reservados à MGE Tech - Siscomge - 2021</p>
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