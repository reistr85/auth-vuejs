<template>
  <div :class="['content-login--form---right', height < 500 ? 'content-login--form---right----mobile' : '']">
    <LoginFormRightHeader />
    <v-divider class="my-5"></v-divider>
    <LoginFormRightForm :loading="loading" @login="login" />
    <p>{{ l.form.register }}d <router-link to="/register">{{ l.actions.register }}</router-link></p>
  </div>
</template>

<script>
import BreakPointMixin from '@/mixins/BreakPointMixin';
import LoginFormRightHeader from './LoginFormRightHeader';
import LoginFormRightForm from './LoginFormRightForm';

export default {
  name: 'LoginFormRight',
  components: { LoginFormRightHeader, LoginFormRightForm },
  props: {
    loading: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    l () {
      return this.$locales.pt.auth.login;
    },
  },
  mixins: [BreakPointMixin],
  methods: {
    login (user) {
      this.$emit('login', user);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles.scss';
</style>
