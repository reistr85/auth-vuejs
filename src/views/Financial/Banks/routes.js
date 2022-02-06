import BankSchema from './schemas/BankSchema';
import ListBanks from './pages/ListBanks';
import CreateBank from './pages/CreateBank';

export default [
  {
    path: BankSchema.routes.list.path,
    name: BankSchema.routes.list.name,
    component: ListBanks,
    meta: BankSchema.routes.list.meta,
  },
  {
    path: BankSchema.routes.create.path,
    name: BankSchema.routes.create.name,
    component: CreateBank,
    meta: BankSchema.routes.create.meta,
  },
  {
    path: BankSchema.routes.show.path,
    name: BankSchema.routes.show.name,
    component: CreateBank,
    meta: BankSchema.routes.show.meta,
  },
]