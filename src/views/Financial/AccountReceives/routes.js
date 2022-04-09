import AccountReceiveSchema from './schemas/AccountReceiveSchema';
import ListAccountReceives from './pages/ListAccountReceives';
import CreateAccountReceive from './pages/CreateAccountReceive';

export default [
  {
    path: AccountReceiveSchema.routes.list.path,
    name: AccountReceiveSchema.routes.list.name,
    component: ListAccountReceives,
    meta: AccountReceiveSchema.routes.list.meta,
  },
  {
    path: AccountReceiveSchema.routes.create.path,
    name: AccountReceiveSchema.routes.create.name,
    component: CreateAccountReceive,
    meta: AccountReceiveSchema.routes.create.meta,
  },
  {
    path: AccountReceiveSchema.routes.show.path,
    name: AccountReceiveSchema.routes.show.name,
    component: CreateAccountReceive,
    meta: AccountReceiveSchema.routes.show.meta,
  },
];