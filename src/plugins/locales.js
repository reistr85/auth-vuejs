import * as Locales from '@/locales/pt-BR/';
import CreateAccountPayment from '@/locales/pt-BR/accountPayments/CreateAccountPayment';
import ListBoxes from '@/locales/pt-BR/boxes/ListBoxes';
import ShowBox from '@/locales/pt-BR/boxes/ShowBox';
import CreateOrderService from '@/locales/pt-BR/orderServices/CreateOrderService';
import ListOrderServices from '@/locales/pt-BR/orderServices/ListOrderServices';

const locales = Object.freeze({
  pt: {
    index: Locales.default,
    accountPayments: {
      createAccountPayment: CreateAccountPayment,
    },  
    boxes: {
      listBoxes: ListBoxes,
      showBox: ShowBox,
    },
    orderServices: {
      listOrderServices: ListOrderServices,
      createOrderService: CreateOrderService,
    }
  }
});

export default {
  install: function (Vue) {
    Vue.prototype.$locales = locales;
    Vue.locales = locales;
  }
};