import AccountPaymentSchema from './schemas/AccountPaymentSchema';
import ListAccountPayments from './pages/ListAccountPayments';
import CreateAccountPayment from './pages/CreateAccountPayment';

export default [
  {
    path: AccountPaymentSchema.routes.list.path,
    name: AccountPaymentSchema.routes.list.name,
    component: ListAccountPayments,
    meta: AccountPaymentSchema.routes.list.meta,
  },
  {
    path: AccountPaymentSchema.routes.create.path,
    name: AccountPaymentSchema.routes.create.name,
    component: CreateAccountPayment,
    meta: AccountPaymentSchema.routes.create.meta,
  },
  {
    path: AccountPaymentSchema.routes.show.path,
    name: AccountPaymentSchema.routes.show.name,
    component: CreateAccountPayment,
    meta: AccountPaymentSchema.routes.show.meta,
  },
]