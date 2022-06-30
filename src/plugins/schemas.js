// Auth
import AuthSchema from '@/views/Auth/schemas/AuthSchema';

import HomeSchema from '@/views/Home/Dashboard/schemas/HomeSchema';
import UserSchema from '@/views/Settings/Users/schemas/UserSchema';
import TypeScheduleSchema from '@/views/Schedules/TypeSchedules/schemas/TypeScheduleSchema';

const schemas = Object.freeze({
  auth: AuthSchema,
  home: HomeSchema,
  user: UserSchema,
  typeSchedule: TypeScheduleSchema,
});

export default {
  install: function (Vue) {
    Vue.prototype.$schemas = schemas;
    Vue.schemas = schemas;
  }
};