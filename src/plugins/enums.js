import * as Enums from '@/utils/enums';

export default {
  install: function (Vue) {
    const enums = Enums;
    Vue.prototype.$enums = enums
    Vue.enums = enums
  }
}