<template>
  <v-navigation-drawer v-model="drawer" :absolute="height < 500" :permanent="height >= 500" elevation="1" height="100%" style="border-right: 1px solid #ebebeb; z-index: 2; min-width: 230px !important;">
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
                <Icon :icon="$icons[item.icon]" class="mr-3" dense />
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :class="getClassMenuActive(child.active)" :key="child.title" link @click="menuNavigator(item, child)">
            <v-list-item-content>
              <v-list-item-title color="primary" :prepend-icon="item.icon">
                <Icon :icon="$icons[child.icon]" class="mr-3" dense />
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
import Icon from '@/components/vuetify/Icon';
import BreakPointMixin from '@/mixins/BreakPointMixin';
import items from '../items';

export default {
  name: 'SideBar',
  components: { Icon },
  props: {
    modeDark: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
      items: items,
      drawer: false,
    };
  },
  mounted() {
    this.openMenuGroup();
  },
  mixins: [BreakPointMixin],
  methods: {
    menuNavigator(item, child) {
      localStorage.setItem(`${process.env.VUE_APP_NAME}.menuGroupName`, item.menuGroupName);

      this.items.forEach((i) => {
        i.items.forEach((c) => {
          c.active = false;
        });
      });

      item.active = true;
      child.active = true;

      this.$router.push({ name: child.route, query: child.params?.query, }).catch(() => {});
    },
    drawerEvent() {
      this.drawer = !this.drawer;
    },
    getClassMenuActive(value) {
      if (value) {
        return this.modeDark.value ? 'childActiveDark' : 'childActiveLight';
      }

      return '';
    },
    openMenuGroup () {
      const menuGroupName = localStorage.getItem(`${process.env.VUE_APP_NAME}.menuGroupName`);

      if (menuGroupName) {
        this.items.forEach((item) => {
          if (item.menuGroupName === menuGroupName) {
            item.active = true;
            item.items.forEach((c) => {
              c.active = false;
              if (c.route === this.$route.name) c.active = true;
            });
          }
        });
      }
    }
  }
};
</script>

<style>

.v-list-item--active {
  border-left: 3px solid red;
  background-color: #E1E1E1;
}
.item-active {
  background: #ebebeb !important;
}

.v-list-group__items > .v-list-item {
  padding-left: 35px !important;
}

.childActiveLight {
  background-color: #EBEBEB;
}

.childActiveDark {
  background-color: #666666;
}
</style>