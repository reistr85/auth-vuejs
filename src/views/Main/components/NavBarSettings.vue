<template>
  <Menu :width="200">
    <h3>Salão de Beleza Mais</h3>
    <p>reistr85@gmail.com</p>
    <v-divider class="mb-"></v-divider>

    <v-list dense>
      <v-list-item link v-for="(item, index) in items" :key="index" @click="$router.push({ name: item.route })">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-action>{{ item.label }}</v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider class="mb-5"></v-divider>

    <Button label="Sair" color="secondary" style="width: 100%" :icon="icons.logout" @click="logout()" />
  </Menu>
</template>

<script>
import { logout, users, industry,  } from '@/utils/icons';
import Menu from '@/components/vuetify/Menu';
import Button from '@/components/vuetify/Button';

export default {
  name: 'NavBarSettings',
  components: { Menu, Button },
  data() {
    return {
      icons: {
        logout: logout,
      },
      items: [
        {icon: industry, label: 'Empresa', route: 'companies'},
        {icon: users, label: 'Usuários', route: 'users'},
      ],
    }
  }
}
</script>

<style>

</style>