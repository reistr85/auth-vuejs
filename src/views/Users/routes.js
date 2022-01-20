import UserSchema from './schemas/UserSchema';
import ListUsers from './pages/ListUsers';
import CreateUser from './pages/CreateUser';

export default [
  {
    path: UserSchema.routes.list.path,
    name: UserSchema.routes.list.name,
    component: ListUsers,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: UserSchema.routes.create.path,
    name: UserSchema.routes.create.name,
    component: CreateUser,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: UserSchema.routes.show.path,
    name: UserSchema.routes.show.name,
    component: CreateUser,
    meta:{
      requiresAuth: true,
    }
  },
]