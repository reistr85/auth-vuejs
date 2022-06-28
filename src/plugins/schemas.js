// Auth
import AuthSchema from '@/views/Auth/schemas/AuthSchema';

import HomeSchema from '@/views/Home/Dashboard/schemas/HomeSchema';
import UserSchema from '@/views/Settings/Users/schemas/UserSchema';

const schemas = Object.freeze({
  auth: AuthSchema,
  home: HomeSchema,
  user: UserSchema,
});

export default {
  install: function (Vue) {
    Vue.prototype.$schemas = schemas;
    Vue.schemas = schemas;
  }
};