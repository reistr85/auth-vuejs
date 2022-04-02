<template>
  <div class="content-login" style="background-color: #3B5998;">
    <div class="content-login--form">
      <div class="content-login--form---left">
        <img src="@/assets/ilustration-register.png" width="350" alt="">
        <p>Seu negócio na palma de sua mão.</p>
      </div>
      <div class="content-login--form---right">
        <div class="content-login--form---right----title">
          <h3>Faça o seu cadasdro</h3>
          <p>Preencha o formuário abaixo de cadastre-se gratuitamente.</p>
        </div>

        <v-divider class="my-5"></v-divider>

        <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="register()">
          <div class="content-login--form---right----form">
            <TextField v-model="user.name" label="Nome" />
            <TextField v-model="user.email" label="E-mail" />
            <TextField v-model="user.cell_phone" label="Celular/Whatsapp" v-mask="[masks.cell_phone]" />
            <TextField v-model="user.password" label="Senha" type="password" v-on:keyup.enter="register()" />
            <Button label="Cadastrar" color="primary" class="btn-login" :loading="loading" @click="register()" />
          </div>
        </v-form>

        <p>Já tenho cadastro. <router-link to="/login">Fazer login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { google, facebook } from '@/utils/icons';
import { isLogged } from '@/utils';
import { mask } from 'vue-the-mask';
import { cell_phone } from '@/utils/masks';
import Button from '@/components/vuetify/Button';
import TextField from '@/components/vuetify/TextField';
import { CompaniesCommands } from '@/views/Settings/Companies/services/CompaniesService';

export default {
  name: 'Login',
  components: { Button, TextField },
  directives: { mask },
  data() {
    return {
      icons: {
        google: google,
        facebook: facebook
      },
      masks: {
        cell_phone: cell_phone
      },
      user: {
        name: '',
        email: '',
        cell_phone: '',
        password: '',
        first: true,
      },
      loading: false,
    };
  },
  mounted() {
    if (isLogged)
      this.$router.push({ name: 'home' });
  },
  computed: {
    valid: {
      get() {
        return this.user.email && this.user.password ? true : false;
      },
      set() {
        return true;
      }
    }
  },
  methods: {
    register() {
      if (this.valid) {
        this.loading = true;

        CompaniesCommands().store(this.user).then(() => {
          this.loading = false;
          this.$router.push({ name: 'home' });
          // window.location = process.env.VUE_APP_URL;
        }).catch((err) => {
          this.loading = false;
          console.error(err);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles.scss';
</style>