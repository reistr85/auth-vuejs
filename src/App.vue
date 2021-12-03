<template>
  <Main />
</template>

<script>
import Main from '@/views/Main/Main'

export default {
  name: 'App',
  components: {
    Main
  },
  data: () => ({
    modeDark: {
      value: false,
      label: 'Modo Escuro'
    },
    selectedItem: 0,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      items2: [
        {
          active: false,
          action: 'mdi-ticket',
          items: [{ title: 'List Item' }],
          title: 'Attractions',
        },
        {
          action: 'mdi-silverware-fork-knife',
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
          title: 'Dining',
        },
        {
          action: 'mdi-school',
          items: [{ title: 'List Item' }],
          title: 'Education',
        },
        {
          action: 'mdi-run',
          items: [{ title: 'List Item' }],
          title: 'Family',
        },
        {
          action: 'mdi-bottle-tonic-plus',
          items: [{ title: 'List Item' }],
          title: 'Health',
        },
        {
          action: 'mdi-content-cut',
          items: [{ title: 'List Item' }],
          title: 'Office',
        },
        {
          action: 'mdi-tag',
          items: [{ title: 'List Item' }],
          title: 'Promotions',
        },
      ],
  }),
  watch: {
    ['modeDark.value']() {
      this.modeDark.value ? this.modeDark.label = 'Modo Claro' : this.modeDark.label = 'Modo Escuro';
    }
  }
};
</script>

<style>
.v-navigation-drawer__content {
    height: 100%;
    overflow-y: hidden !important;
    overflow-x: hidden !important;
}
</style>