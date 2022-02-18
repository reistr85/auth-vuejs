import * as Locales from '@/locales/pt-BR/';

export default {
  install: function (Vue) {
    const locales = Locales.default;
    Vue.prototype.$locales = locales
    Vue.locales = locales
  }
}