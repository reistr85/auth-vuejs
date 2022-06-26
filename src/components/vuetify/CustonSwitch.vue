<template>
  <div>
    <v-switch v-bind="$attrs" v-on="$listeners" :label="label"></v-switch>
  </div>
</template>

<script>
export default {
  name: 'CustonSwitch',
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