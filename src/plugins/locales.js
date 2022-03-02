import * as Locales from '@/locales/pt-BR/';
import ListBoxes from '@/locales/pt-BR/boxes/ListBoxes';

const locales = Object.freeze({
  pt: {
    index: Locales.default,
    boxes: {
      listBoxes: ListBoxes,
    }
  }
});

export default {
  install: function (Vue) {
    Vue.prototype.$locales = locales
    Vue.locales = locales
  }
}