<template>
  <v-icon>{{ icon }}</v-icon>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  }
}
</script>

<style>

</style>