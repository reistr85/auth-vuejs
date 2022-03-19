<template>
  <v-sheet height="64">
    <v-toolbar flat>
      <Button label="Hoje" outlined color="grey darken-2" @click="$emit('setToday')" />
      <Button :icon="$icons.chevronLeft" fab x-small class="elevation-0 ml-5" @click="$emit('prev')" />
      <Button :icon="$icons.chevronRight" fab x-small class="elevation-0" @click="$emit('next')" />

      <v-toolbar-title v-if="calendar">{{ calendar.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <Button :label="typeToLabel[type]" v-bind="attrs" v-on="on" :icon="$icons.menuDown" outlined class="" />
        </template>
        <v-list>
          <v-list-item v-for="(list, index) in list" :key="index" @click="$emit('update:type', list.value)">
            <v-list-item-title>{{ list.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-sheet>
</template>

<script>
import Button from '@/components/vuetify/Button';

export default {
  name: 'Header',
  components: { Button },
  props: {
    calendar: {
      required: true,
    },
    typeToLabel: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      list: [
        {
          label: 'Dia',
          value: 'day'
        },
        {
          label: 'Semana',
          value: 'week'
        },
        {
          label: 'Mês',
          value: 'month'
        },
        {
          label: '4 dias',
          value: '4day'
        }
      ]
    };
  }
};
</script>

<style>

</style>