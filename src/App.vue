<template>
  <Main />
</template>

<script>
import Main from '@/views/Main/Main';

export default {
  name: 'App',
  components: {
    Main
  },
  data: () => ({
  }),
};
</script>

<style>
.v-navigation-drawer__content {
    height: 100%;
    overflow-y: hidden !important;
    overflow-x: hidden !important;
}
</style>