import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Icons from './plugins/icons';
import Services from './plugins/services';
import "./plugins/vuetify-mask.js";
import './plugins/toasts';
import router from './router';

Vue.config.productionTip = false
Vue.use(Icons)
Vue.use(Services)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
