<template>
  <v-card class="mt-2 py-3 px-3" :color="modeDark.value ? '#333' : ''" elevation="5" min-height="500">
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: 'PageContent',
  data() {
    return {
      modeDark: {
        value: false,
        label: 'Modo Escuro'
      },
    };
  }
};
</script>

<style>

</style>