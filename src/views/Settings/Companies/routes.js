import CompanySchema from './schemas/CompanySchema';
import ListCompanies from './pages/ListCompanies';
import CreateCompany from './pages/CreateCompany';

export default [
  {
    path: CompanySchema.routes.list.path,
    name: CompanySchema.routes.list.name,
    component: ListCompanies,
    meta: CompanySchema.routes.list.meta,
  },
  {
    path: CompanySchema.routes.create.path,
    name: CompanySchema.routes.create.name,
    component: CreateCompany,
    meta: CompanySchema.routes.create.meta
  },
  {
    path: CompanySchema.routes.show.path,
    name: CompanySchema.routes.show.name,
    component: CreateCompany,
    meta: CompanySchema.routes.show.meta
  },
]