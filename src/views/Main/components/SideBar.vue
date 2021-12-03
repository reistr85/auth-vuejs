<template>
  <v-navigation-drawer  permanent elevation="1" height="100%">
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

    <v-card class="mx-auto" max-width="300" heigth="100%" style="height: 100%;" elevation="0" tile>
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
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      selectedItem: 0,
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
      ],
    }
  }
}
</script>

<style>

</style>