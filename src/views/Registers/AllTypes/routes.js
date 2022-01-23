import AllTypeSchema from './schemas/AllTypeSchema';
import ListAllTypes from './pages/ListAllTypes';
import CreateAllType from './pages/CreateAllType';

export default [
  {
    path: AllTypeSchema.routes.list.path,
    name: AllTypeSchema.routes.list.name,
    component: ListAllTypes,
    meta: AllTypeSchema.routes.list.meta,
  },
  {
    path: AllTypeSchema.routes.create.path,
    name: AllTypeSchema.routes.create.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.create.meta,
  },
  {
    path: AllTypeSchema.routes.show.path,
    name: AllTypeSchema.routes.show.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.show.meta,
  },
]