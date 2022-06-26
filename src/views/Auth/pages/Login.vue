<template>
  <div class="content-login px-5" style="background-color: #FE715F;">
    <div :class="['content-login--form', height < 500 ? 'content-login--form---mobile' : '']">
      <LoginFormLeft />
      <LoginFormRight :loading="loading" @login="login"  />
    </div>
  </div>
</template>

<script>
import { isLogged } from '@/utils';
import BreakPointMixin from '@/mixins/BreakPointMixin';
import LoginFormLeft from './components/LoginFormLeft';
import LoginFormRight from './components/LoginFormRight';

export default {
  name: 'Login',
  components: { LoginFormLeft, LoginFormRight },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    l () {
      return this.$locales.pt.auth.login;
    },
  },
  mixins: [BreakPointMixin],
  mounted() {
    if (isLogged)
      this.$router.push({ name: 'home' });
  },
  methods: {
    login(user) {
      this.loading = true;
      this.$api.auth.login(user).then(() => {
        this.loading = false;
        window.location = process.env.VUE_APP_URL;
      }).catch((err) => {
        this.loading = false;
        if (err.response.status === 401) {
          this.$noty.error(this.l.noty.emailOrPasswordInvalid);
        } else {
          this.$noty.error(this.l.noty.errorLogin);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>