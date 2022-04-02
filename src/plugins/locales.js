import Locales from '@/locales/pt-BR/';

const locales = Object.freeze({
  pt: Locales
});

export default {
  install: function (Vue) {
    Vue.prototype.$locales = locales;
    Vue.locales = locales;
  }
};