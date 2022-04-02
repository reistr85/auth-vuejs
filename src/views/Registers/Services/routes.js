import ServiceSchema from './schemas/ServiceSchema';
import ListServices from './pages/ListServices';
import CreateService from './pages/CreateService';

export default [
  {
    path: ServiceSchema.routes.list.path,
    name: ServiceSchema.routes.list.name,
    component: ListServices,
    meta: ServiceSchema.routes.list.meta,
  },
  {
    path: ServiceSchema.routes.create.path,
    name: ServiceSchema.routes.create.name,
    component: CreateService,
    meta: ServiceSchema.routes.create.meta,
  },
  {
    path: ServiceSchema.routes.show.path,
    name: ServiceSchema.routes.show.name,
    component: CreateService,
    meta: ServiceSchema.routes.show.meta,
  },
];