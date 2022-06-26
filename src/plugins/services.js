import AuthService from '@/views/Auth/services/AuthService';
import UsersService from '@/views/Settings/Users/services/UsersService';

const api = Object.freeze({
  auth: AuthService,
  users: UsersService,
});

export default {
  install: function (Vue) {
    Vue.prototype.$api = api;
    Vue.api = api;
  }
};