import AuthSchema from './schemas/AuthSchema';
import Login from '../Auth/pages/Login.vue'

export default [
  {
    path: AuthSchema.routes.login.path,
    name: AuthSchema.routes.login.name,
    component: Login,
    meta:{}
  },
]