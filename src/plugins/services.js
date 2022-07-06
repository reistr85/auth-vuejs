import AuthService from '@/views/Auth/services/AuthService';
import UsersService from '@/views/Settings/Users/services/UsersService';
import TypeSchedulesService from '@/views/Schedules/TypeSchedules/services/TypeSchedulesService';
import RegistersService from '@/views/Registers/Registers/services/RegistersService';
import CertificatesService from '@/views/Registers/Certificates/services/CertificatesService';
import CertificateTypesService from '@/views/Registers/CertificateTypes/services/CertificateTypesService';

const api = Object.freeze({
  auth: AuthService,
  users: UsersService,
  typeSchedules: TypeSchedulesService,
  registers: RegistersService,
  certificates: CertificatesService,
  certificateTypes: CertificateTypesService,
});

export default {
  install: function (Vue) {
    Vue.prototype.$api = api;
    Vue.api = api;
  }
};