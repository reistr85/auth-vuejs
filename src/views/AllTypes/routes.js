import AllTypeSchema from './schemas/AllTypeSchema';
import ListAllTypes from './pages/ListAllTypes';
import CreateAllType from './pages/CreateAllType';

export default [
  {
    path: AllTypeSchema.routes.paymentMethod.list.path,
    name: AllTypeSchema.routes.paymentMethod.list.name,
    component: ListAllTypes,
    meta: AllTypeSchema.routes.paymentMethod.list.meta,
  },
  {
    path: AllTypeSchema.routes.paymentMethod.create.path,
    name: AllTypeSchema.routes.paymentMethod.create.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.paymentMethod.create.meta
  },
  {
    path: AllTypeSchema.routes.paymentMethod.show.path,
    name: AllTypeSchema.routes.paymentMethod.show.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.paymentMethod.show.meta
  },
];