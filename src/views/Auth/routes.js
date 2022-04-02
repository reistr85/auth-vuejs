import AuthSchema from './schemas/AuthSchema';
import Login from '../Auth/pages/Login';
import Register from '../Auth/pages/Register';

export default [
  {
    path: AuthSchema.routes.login.path,
    name: AuthSchema.routes.login.name,
    component: Login,
    meta:{}
  },
  {
    path: AuthSchema.routes.register.path,
    name: AuthSchema.routes.register.name,
    component: Register,
    meta:{}
  },
];