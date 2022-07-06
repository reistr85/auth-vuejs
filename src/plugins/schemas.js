// Auth
import AuthSchema from '@/views/Auth/schemas/AuthSchema';

import HomeSchema from '@/views/Home/Dashboard/schemas/HomeSchema';
import UserSchema from '@/views/Settings/Users/schemas/UserSchema';
import TypeScheduleSchema from '@/views/Schedules/TypeSchedules/schemas/TypeScheduleSchema';
import RegisterSchema from '@/views/Registers/Registers/schemas/RegisterSchema';
import CertificateSchema from '@/views/Registers/Certificates/schemas/CertificateSchema';
import CertificateTypeSchema from '@/views/Registers/CertificateTypes/schemas/CertificateTypeSchema';

const schemas = Object.freeze({
  auth: AuthSchema,
  home: HomeSchema,
  user: UserSchema,
  typeSchedule: TypeScheduleSchema,
  register: RegisterSchema,
  certificate: CertificateSchema,
  certificateType: CertificateTypeSchema,
});

export default {
  install: function (Vue) {
    Vue.prototype.$schemas = schemas;
    Vue.schemas = schemas;
  }
};