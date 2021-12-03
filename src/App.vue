<template>
  <v-app>
    <!-- <v-app-bar app absolute elevation="2"></v-app-bar> -->

    <v-card flat tile style="z-index: 999">
      <v-toolbar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    
    <v-card height="100%" class="mt-0">
      <div style="height: 100%; display: flex; width: 100%;">
        <v-navigation-drawer permanent elevation="1">
          <template v-slot:prepend>
            <v-list-item two-line>
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/women/81.jpg">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Jane Smith</v-list-item-title>
                <v-list-item-subtitle>Logged In</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-divider></v-divider>

          <v-card class="mx-auto" max-width="300" heigth="100%" elevation="0" tile>
            <v-list dense>
              <v-subheader>REPORTS</v-subheader>

              <v-list-group v-for="item in items2"  class="mt-1 pt-0 body-2" :key="item.title" v-model="item.active" :prepend-icon="item.action">
                <template v-slot:activator>
                  <v-list-item-content class="pt-1" dense>
                    <v-list-item-action v-text="item.title"></v-list-item-action>
                  </v-list-item-content>
                </template>

                <v-list-item v-for="child in item.items" class="ml-14" :key="child.title">
                  <v-list-item-content>
                    <v-list-item-action v-text="child.title"></v-list-item-action>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>

        </v-navigation-drawer>

        <div class="main" style="">
          <div class="main-title">
            <div>
              <p class="title">Listar Contas</p>
              <h3 class="subtitle-1">Contas</h3>
              <h5 class="subtitle-2">Crie uma conta para seu cliente poder gerenciar os domínios e e-mail, além de administrar sites.</h5>
            </div>

            <div>
              <v-btn :loading="loading3" :disabled="loading3" color="primary" class="white--text" 
                @click="loader = 'loading3'">
                <v-icon left dark>mdi-plus-circle-outline</v-icon>
                NOVA CONTA
              </v-btn>
            </div>
          </div>
          <v-divider class="my-5"></v-divider>

          <v-card class="mt-2 py-3 px-3" elevation="2" min-height="500">d</v-card>

          <p class="caption text-center text--disabled mt-5" x-small>Todos os direitos reservados à MGE Tech - Siscomge - 2021</p>
        </div>
      </div>
    </v-card>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    selectedItem: 0,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      items2: [
        {
          active: false,
          action: 'mdi-ticket',
          items: [{ title: 'List Item' }],
          title: 'Attractions',
        },
        {
          action: 'mdi-silverware-fork-knife',
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
          title: 'Dining',
        },
        {
          action: 'mdi-school',
          items: [{ title: 'List Item' }],
          title: 'Education',
        },
        {
          action: 'mdi-run',
          items: [{ title: 'List Item' }],
          title: 'Family',
        },
        {
          action: 'mdi-bottle-tonic-plus',
          items: [{ title: 'List Item' }],
          title: 'Health',
        },
        {
          action: 'mdi-content-cut',
          items: [{ title: 'List Item' }],
          title: 'Office',
        },
        {
          action: 'mdi-tag',
          items: [{ title: 'List Item' }],
          title: 'Promotions',
        },
      ],
  }),
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 95%;
  padding: 50px 50px 0 50px;
}

.main-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.content-main {
  width: 100%;
  background-color: red
}
</style>