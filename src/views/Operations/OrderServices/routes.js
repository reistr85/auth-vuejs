import OrderServiceSchema from './schemas/OrderServiceSchema';
import ListOrderServices from './pages/ListOrderServices';
import CreateOrderService from './pages/CreateOrderService';

export default [
  {
    path: OrderServiceSchema.routes.list.path,
    name: OrderServiceSchema.routes.list.name,
    component: ListOrderServices,
    meta: OrderServiceSchema.routes.list.meta,
  },
  {
    path: OrderServiceSchema.routes.create.path,
    name: OrderServiceSchema.routes.create.name,
    component: CreateOrderService,
    meta: OrderServiceSchema.routes.create.meta,
  },
  {
    path: OrderServiceSchema.routes.show.path,
    name: OrderServiceSchema.routes.show.name,
    component: CreateOrderService,
    meta: OrderServiceSchema.routes.show.meta,
  },
];