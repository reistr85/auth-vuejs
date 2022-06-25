<template>
  <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="login()">
    <div class="content-login--form---right----form">
      <TextField v-model="user.email" :label="l.form.email" />
      <TextField v-model="user.password" :label="l.form.password" type="password" v-on:keyup.enter="login()" />
      <Button :label="l.actions.login" color="primary" class="btn-login" :loading="loading" @click="login()" />
    </div>
  </v-form>
</template>

<script>
import TextField from '@/components/vuetify/TextField';
import Button from '@/components/vuetify/Button';

export default {
  name: 'LoginFormRightForm',
  components: { TextField, Button },
  props: {
    loading: {
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      user: {
        email: 'admin@mail.com',
        password: '12345678',
      },
    };
  },
  computed: {
    l () {
      return this.$locales.pt.auth.login;
    },
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
    login () {
      if (this.valid) {
        this.$emit('login', this.user);
      }
    }
  }
};
</script>
