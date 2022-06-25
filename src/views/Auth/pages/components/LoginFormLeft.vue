<template>
  <div class="content-login--form---left" v-if="height >= 500">
    <img src="@/assets/ilustration-login.png" width="350" alt="">
    <p v-text="l.illustration.title" />
  </div>
</template>

<script>
import BreakPointMixin from '@/mixins/BreakPointMixin';

export default {
  name: 'LoginFormLeft',
  computed: {
    l () {
      return this.$locales.pt.auth.login;
    },
  },
  mixins: [BreakPointMixin],
};
</script>

<style lang="scss" scoped>
@import '../../styles.scss';
</style>
