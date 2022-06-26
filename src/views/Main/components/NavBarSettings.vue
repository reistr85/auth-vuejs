<template>
  <Menu :width="200">
    <h3>Company</h3>
    <p>admin@mail.com.br</p>
    <v-divider class="mb-"></v-divider>

    <v-list dense>
      <v-list-item link v-for="(item, index) in items" :key="index" @click="$router.push({ name: item.route })">
        <v-list-item-icon>
          <v-icon>{{ $icons.users }}</v-icon>
        </v-list-item-icon>
        <v-list-item-action>{{ item.label }}</v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider class="mb-5"></v-divider>

    <Button label="Sair" color="secondary" style="width: 100%" :icon="$icons.logout" @click="logout()" />
  </Menu>
</template>

<script>
import Menu from '@/components/vuetify/Menu';
import Button from '@/components/vuetify/Button';

export default {
  name: 'NavBarSettings',
  components: { Menu, Button },
  data() {
    return {
      items: [
        { label: 'Usuários', route: 'users' },
      ],
    };
  },
  methods:  {
    logout () {
      this.$api.auth.logout().then(() =>  {
        this.$router.push({ name: 'login' });
      });
    }
  }
};
</script>

<style>

</style>