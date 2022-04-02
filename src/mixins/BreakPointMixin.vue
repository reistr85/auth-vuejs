<script>
export default {
  computed: {
    height() {
      let size = 0;
      switch (this.$vuetify.breakpoint.name) {
      case 'xs': size =  220; break;
      case 'sm': size =  400; break;
      case 'md': size =  500; break;
      case 'lg': size =  600; break;
      case 'xl': size =  800; break;
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (size < 500) this.drawer = false;
      return size;
    },
  },
};
</script>
