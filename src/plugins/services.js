import AuthService from '@/views/Auth/services/AuthService';
import UsersService from '@/views/Settings/Users/services/UsersService';
import AllTypesService from '@/views/AllTypes/services/AllTypesService';
import RegistersService from '@/views/Registers/Registers/services/RegistersService';
import CertificatesService from '@/views/Registers/Certificates/services/CertificatesService';

const api = Object.freeze({
  auth: AuthService,
  users: UsersService,
  allTypes: AllTypesService,
  registers: RegistersService,
  certificates: CertificatesService,
});

export default {
  install: function (Vue) {
    Vue.prototype.$api = api;
    Vue.api = api;
  }
};