<script>
import { typePageOptions } from '@/utils';

export default {
  data() {
    return {
      typePageOptions: typePageOptions
    };
  },
  computed: {
    typePage() {
      let type = '';
      switch (this.$route.meta.typePage) {
      case typePageOptions.list: type = typePageOptions.list; break;
      case typePageOptions.create: type = typePageOptions.create; break;
      case typePageOptions.show: type = typePageOptions.show; break;
      }

      return type;
    }
  },
};
</script>