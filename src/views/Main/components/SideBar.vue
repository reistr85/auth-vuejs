<template>
  <v-navigation-drawer v-model="drawer" :absolute="height < 500" :permanent="height >= 500" elevation="1" height="100%" style="border-right: 1px solid #ebebeb; z-index: 10">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Libg</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card class="mx-auto"  heigth="100%" style="height: 100%;" elevation="0" tile>
      <v-list dense>
        <v-list-group v-model="item.active" v-for="item in items" :key="item.title" no-action dense class="mt-2">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                <Icon :icon="item.icon" class="mr-3" dense />
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :class="{ 'childActive': child.active }" :key="child.title" link @click="menuNavigator(item, child)">
            <v-list-item-content>
              <v-list-item-title color="primary" :prepend-icon="item.icon">
                <Icon :icon="child.icon" class="mr-3" dense />
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>

  </v-navigation-drawer>
</template>

<script>
import { home, account, chart, sale, accountSettings, list, tune, calendar } from '@/utils/icons';
import Icon from '@/components/vuetify/Icon'
import BreakPointMixin from '@/mixins/BreakPointMixin';

export default {
  name: 'SideBar',
  components: { Icon },
  data() {
    return {
      items: [
        {
          active: false,
          menuGroupName: 'home',
          icon: home,
          title: 'Início',
          items: [{ icon: chart, title: 'Dashboard', route: 'home' }],
        },
        {
          active: false,
          menuGroupName: 'register',
          icon: account,
          action: account,
          title: 'Cadastros',
          items: [
            { icon: accountSettings, title: 'Registros', route: 'registers', active: false },
            { icon: list, title: 'Tipos Gerais', route: 'alltypes', active: false },
            { icon: tune, title: 'Serviços', route: 'services', active: false },
          ],
        },
        {
          active: false,
          menuGroupName: 'operations',
          icon: sale,
          title: 'Operações',
          items: [
            { icon: calendar, title: 'Agendamentos', route: 'appointments', active: false },
            { icon: tune, title: 'Ordem de Serviços', route: 'orderservices', active: false },
          ],
        },
        {
          active: false,
          menuGroupName: 'reports',
          icon: chart,
          title: 'Relatórios',
          items: [
            { icon: calendar, title: 'Agendamentos', route: 'reportappointments', active: false },
            { icon: tune, title: 'Ordem de Serviços', route: 'reportorderservices', active: false },
            { icon: sale, title: 'Caixa', route: 'reportboxes', active: false },
            { icon: account, title: 'Clientes', route: 'reportcustomers', active: false },
          ],
        },
      ],
      drawer: false,
    }
  },
  mounted() {
    const menuGroupName = localStorage.getItem(`${process.env.VUE_APP_NAME}.menuGroupName`);

    if(menuGroupName) {
      this.items.forEach((item) => {
        if(item.menuGroupName === menuGroupName) {
          item.active = true;
          item.items.forEach((c) => {
            c.active = false;
            if(c.route === this.$route.name) c.active = true;
          });
        }
      });
    }
  },
  mixins: [BreakPointMixin],
  methods: {
    menuNavigator(item, child) {
      localStorage.setItem(`${process.env.VUE_APP_NAME}.menuGroupName`, item.menuGroupName)

      this.items.forEach((i) => {
        i.items.forEach((c) => {
          c.active = false;
        });
      })

      item.active = true;
      child.active = true;
      this.$router.push({ name: child.route }).catch(() => {})
    },
    drawerEvent() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<style>

.v-list-item--active {
  border-left: 3px solid red;
  background-color: #ebebeb;
}
.item-active {
  background: #ebebeb !important;
}

.v-list-group__items > .v-list-item {
  padding-left: 35px !important;
}

.childActive {
  background-color: #F6F6F6;
}

</style>