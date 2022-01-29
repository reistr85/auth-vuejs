<template>
  <div class="content-login px-5" style="background-color: #FE715F;">
    <div :class="['content-login--form', height < 500 ? 'content-login--form---mobile' : '']">
      <div class="content-login--form---left" v-if="height >= 500">
        <img src="@/assets/ilustration-login.png" width="350" alt="">
        <p>Seu negócio na palma de sua mão.</p>
      </div>
      <div :class="['content-login--form---right', height < 500 ? 'content-login--form---right----mobile' : '']">
        <div class="content-login--form---right----title">
          <h3>Começar agora.</h3>
          <p>Preencha o formuário ou faça o login social abaixo.</p>
        </div>

        <div class="content-login--form---right----social">
          <Button label="Google" color="primary" outlined :icon="icons.google" />
          <Button label="Facebook" color="secondary" class="ml-5" :icon="icons.facebook" />
        </div>

        <v-divider class="my-5"></v-divider>

        <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="login()">
          <div class="content-login--form---right----form">
            <TextField v-model="user.email" label="E-mail" />
            <TextField v-model="user.password" label="Senha" type="password" v-on:keyup.enter="login()" />
            <Button label="Entrar" color="primary" class="btn-login" :loading="loading" @click="login()" />
          </div>
        </v-form>

        <p>Ainda não é cadastrado? <router-link to="/register">Clique aqui</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { google, facebook } from '@/utils/icons'
import { isLogged } from '@/utils'
import Button from '@/components/vuetify/Button'
import TextField from '@/components/vuetify/TextField'
import AuthService from '../services/AuthService';
import BreakPointMixin from '@/mixins/BreakPointMixin';

export default {
  name: 'Login',
  components: { Button, TextField },
  data() {
    return {
      icons: {
        google: google,
        facebook: facebook
      },
      user: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  mixins: [BreakPointMixin],
  mounted() {
    if(isLogged)
      this.$router.push({ name: 'home' })
  },
  computed: {
    valid: {
      get() {
        return this.user.email && this.user.password ? true : false
      },
      set() {
        return true;
      }
    }
  },
  methods: {
    login() {
      if(this.valid) {
        this.loading = true;

        AuthService.login(this.user).then(() => {
          this.loading = false;
          window.location = process.env.VUE_APP_URL;
        }).catch((err) => {
          this.loading = false;
          console.error(err)
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>