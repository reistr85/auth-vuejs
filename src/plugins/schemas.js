// Auth
import AuthSchema from '@/views/Auth/schemas/AuthSchema';

import HomeSchema from '@/views/Home/Dashboard/schemas/HomeSchema';
import UserSchema from '@/views/Settings/Users/schemas/UserSchema';
import AllTypeSchema from '@/views/AllTypes/schemas/AllTypeSchema';
import RegisterSchema from '@/views/Registers/Registers/schemas/RegisterSchema';
import CertificateSchema from '@/views/Registers/Certificates/schemas/CertificateSchema';

const schemas = Object.freeze({
  auth: AuthSchema,
  home: HomeSchema,
  user: UserSchema,
  allType: AllTypeSchema,
  register: RegisterSchema,
  certificate: CertificateSchema,
});

export default {
  install: function (Vue) {
    Vue.prototype.$schemas = schemas;
    Vue.schemas = schemas;
  }
};