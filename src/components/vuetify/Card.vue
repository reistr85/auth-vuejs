<template>
  <v-card>
    <v-card-title>
      <h3 v-text="title"></h3>
    </v-card-title>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>