<template>
  <v-col :cols="$attrs.cols" :md="$attrs.md">
    <slot />
  </v-col>
</template>

<script>
export default {
  name: 'Col'
};
</script>
