import ServiceSchema from './schemas/ServiceSchema';
import ListServices from './pages/ListServices';
import CreateService from './pages/CreateService';

export default [
  {
    path: ServiceSchema.routes.list.path,
    name: ServiceSchema.routes.list.name,
    component: ListServices,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: ServiceSchema.routes.create.path,
    name: ServiceSchema.routes.create.name,
    component: CreateService,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: ServiceSchema.routes.show.path,
    name: ServiceSchema.routes.show.name,
    component: CreateService,
    meta:{
      requiresAuth: true,
    }
  },
]