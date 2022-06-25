<template>
  <div>
    <div class="content-login--form---right----title">
      <h3 v-text="l.header.title" />
      <p v-text="l.header.subTitle" />
    </div>

    <div class="content-login--form---right----social">
      <Button :label="l.actions.google" color="primary" outlined :icon="$icons.google" />
      <Button :label="l.actions.facebook" color="secondary" class="ml-5" :icon="$icons.facebook" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/vuetify/Button';

export default {
  name: 'LoginFormRightHeader',
  components: { Button },
  computed: {
    l () {
      return this.$locales.pt.auth.login;
    },
  },
};
</script>
