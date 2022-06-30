import AuthService from '@/views/Auth/services/AuthService';
import UsersService from '@/views/Settings/Users/services/UsersService';
import TypeSchedulesService from '@/views/Schedules/TypeSchedules/services/TypeSchedulesService';

const api = Object.freeze({
  auth: AuthService,
  users: UsersService,
  typeSchedules: TypeSchedulesService,
});

export default {
  install: function (Vue) {
    Vue.prototype.$api = api;
    Vue.api = api;
  }
};