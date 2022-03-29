<template>
  <v-switch v-bind="$attrs" v-on="$listeners" :label="label"></v-switch>
</template>

<script>
export default {
  name: 'Swit',
  props: {
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style>

</style>