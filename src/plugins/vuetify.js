import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/es5/locale/pt';

Vue.use(Vuetify, {
});

const light = {
    primary: {
      base: '#FE715F',
    },
    secondary: '#3B5998',
  }

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
    theme: {
        themes: { light },
      },
});
