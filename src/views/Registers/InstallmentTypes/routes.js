import InstallmentTypeSchema from './schemas/InstallmentTypeSchema';
import ListInstallmentTypes from './pages/ListInstallmentTypes';
import CreateInstallmentType from './pages/CreateInstallmentType';

export default [
  {
    path: InstallmentTypeSchema.routes.list.path,
    name: InstallmentTypeSchema.routes.list.name,
    component: ListInstallmentTypes,
    meta: InstallmentTypeSchema.routes.list.meta,
  },
  {
    path: InstallmentTypeSchema.routes.create.path,
    name: InstallmentTypeSchema.routes.create.name,
    component: CreateInstallmentType,
    meta: InstallmentTypeSchema.routes.create.meta,
  },
  {
    path: InstallmentTypeSchema.routes.show.path,
    name: InstallmentTypeSchema.routes.show.name,
    component: CreateInstallmentType,
    meta: InstallmentTypeSchema.routes.show.meta,
  },
]