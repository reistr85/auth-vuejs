<template>
  <div>
    <v-chip v-bind="$attrs" v-on="$listeners" class="ma-2" close @click:close="chip1 = false">
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
    }
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