import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
});

const light = {
    primary: {
      base: '#FE715F',
    },
    secondary: '#3B5998',
  }

export default new Vuetify({
    theme: {
        themes: { light },
      },
});
