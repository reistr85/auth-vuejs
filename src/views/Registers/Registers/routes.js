import RegisterSchema from './schemas/RegisterSchema';
import ListRegisters from './pages/ListRegisters';
import CreateRegister from './pages/CreateRegister';

export default [
  {
    path: RegisterSchema.routes.list.path,
    name: RegisterSchema.routes.list.name,
    component: ListRegisters,
    meta: RegisterSchema.routes.list.meta,
  },
  {
    path: RegisterSchema.routes.create.path,
    name: RegisterSchema.routes.create.name,
    component: CreateRegister,
    meta: RegisterSchema.routes.create.meta,
  },
  {
    path: RegisterSchema.routes.show.path,
    name: RegisterSchema.routes.show.name,
    component: CreateRegister,
    meta: RegisterSchema.routes.show.meta,
  },
];