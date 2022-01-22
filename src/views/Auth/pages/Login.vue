<template>
  <div class="content-login">
    <div class="content-login--form">
      <div class="content-login--form---left">
        <img src="@/assets/ilustration-login.png" width="350" alt="">
        <p>Seu negócio na palma de sua mão.</p>
      </div>
      <div class="content-login--form---right">
        <div class="content-login--form---right----title">
          <h3>Começar agora.</h3>
          <p>Preencha o formuário ou faça o login social abaixo.</p>
        </div>

        <div class="content-login--form---right----social">
          <Button label="Google" color="primary" outlined :icon="icons.google" />
          <Button label="Facebook" color="secondary" class="ml-5" :icon="icons.facebook" />
        </div>

        <v-divider class="my-5"></v-divider>

        <div class="content-login--form---right----form">
          <TextField label="E-mail" />
          <TextField label="Senha" type="password" />
          <Button label="Entrar" color="primary" class="btn-login" />
        </div>

        <p>Ainda não é cadastrado? <router-link to="/register">Clique aqui</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { google, facebook } from '@/utils/icons'
import Button from '@/components/vuetify/Button'
import TextField from '@/components/vuetify/TextField'

export default {
  name: 'Login',
  components: { Button, TextField },
  data() {
    return {
      icons: {
        google: google,
        facebook: facebook
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>