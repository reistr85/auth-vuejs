import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
});

const light = {
    primary: {
      base: colors.red.accent3,
    },
    secondary: colors.blue.base,
  }

export default new Vuetify({
    theme: {
        themes: { light },
      },
});
