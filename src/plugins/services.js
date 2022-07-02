import AuthService from '@/views/Auth/services/AuthService';
import UsersService from '@/views/Settings/Users/services/UsersService';
import TypeSchedulesService from '@/views/Schedules/TypeSchedules/services/TypeSchedulesService';
import RegistersService from '@/views/Registers/Registers/services/RegistersService';

const api = Object.freeze({
  auth: AuthService,
  users: UsersService,
  typeSchedules: TypeSchedulesService,
  registers: RegistersService,
});

export default {
  install: function (Vue) {
    Vue.prototype.$api = api;
    Vue.api = api;
  }
};