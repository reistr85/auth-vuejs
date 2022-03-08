import * as Locales from '@/locales/pt-BR/';
import ListBoxes from '@/locales/pt-BR/boxes/ListBoxes';
import CreateOrderService from '@/locales/pt-BR/orderServices/CreateOrderService';

const locales = Object.freeze({
  pt: {
    index: Locales.default,
    boxes: {
      listBoxes: ListBoxes,
    },
    orderServices: {
      createOrderService: CreateOrderService,
    }
  }
});

export default {
  install: function (Vue) {
    Vue.prototype.$locales = locales
    Vue.locales = locales
  }
}