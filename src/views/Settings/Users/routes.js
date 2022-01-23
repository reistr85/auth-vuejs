import UserSchema from './schemas/UserSchema';
import ListUsers from './pages/ListUsers';
import CreateUser from './pages/CreateUser';

export default [
  {
    path: UserSchema.routes.list.path,
    name: UserSchema.routes.list.name,
    component: ListUsers,
    meta:{
      ...UserSchema.routes.list.meta,
      requiresAuth: true,
    }
  },
  {
    path: UserSchema.routes.create.path,
    name: UserSchema.routes.create.name,
    component: CreateUser,
    meta:{
      ...UserSchema.routes.create.meta,
      requiresAuth: true,
    }
  },
  {
    path: UserSchema.routes.show.path,
    name: UserSchema.routes.show.name,
    component: CreateUser,
    meta:{
      ...UserSchema.routes.show.meta,
      requiresAuth: true,
    }
  },
]