import * as Icons from '@/utils/icons';

export default {
  install: function (Vue) {
    const icons = Icons;
    Vue.prototype.$icons = icons;
    Vue.icons = icons;
  }
};