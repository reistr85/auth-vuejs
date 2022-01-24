<template>
  <div>
    <v-chip v-bind="$attrs" v-on="$listeners" :close="close" small @click:close="chip1 = false">
      {{ label }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    label: {
      type: String,
      required: true
    },
    close: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      chip1: true,
    }
  }
}
</script>

<style>

</style>