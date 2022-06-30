/* eslint-disable no-unused-vars */
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Icons from './plugins/icons';
import Enums from './plugins/enums';
import Services from './plugins/services';
import Locales from './plugins/locales';
import Schemas from './plugins/schemas';
import './plugins/vuetify-mask.js';
import './plugins/toasts';
import router from './router';
import { makeServer } from './server/index';

console.log('environment', process.env.VUE_APP_NODE_ENV);
if (process.env.VUE_APP_NODE_ENV === 'development') {
  makeServer();
}

Vue.config.productionTip = false;


Vue.config.productionTip = false;
Vue.use(Icons);
Vue.use(Services);
Vue.use(Enums);
Vue.use(Locales);
Vue.use(Schemas);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
