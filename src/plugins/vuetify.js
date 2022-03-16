/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/es5/locale/pt';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
});

const light = {
  primary: {
    base: '#FE715F',
  },
  secondary: '#3B5998',
  accent: '#8c9eff',
  error: '#b71c1c',
  background: '#FF0',
}

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
    theme: {
      // dark: true,
      // light: true,
      themes: {
        light,
        dark: {
          primary: '#FE715F',
          secondary: colors.blue.lighten1,
          background: '#FF0'
        },
      },
    },
});
