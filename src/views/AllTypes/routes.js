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
  {
    path: AllTypeSchema.routes.certificateType.list.path,
    name: AllTypeSchema.routes.certificateType.list.name,
    component: ListAllTypes,
    meta: AllTypeSchema.routes.certificateType.list.meta,
  },
  {
    path: AllTypeSchema.routes.certificateType.create.path,
    name: AllTypeSchema.routes.certificateType.create.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.certificateType.create.meta
  },
  {
    path: AllTypeSchema.routes.certificateType.show.path,
    name: AllTypeSchema.routes.certificateType.show.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.certificateType.show.meta
  },
  {
    path: AllTypeSchema.routes.certificatePeriod.list.path,
    name: AllTypeSchema.routes.certificatePeriod.list.name,
    component: ListAllTypes,
    meta: AllTypeSchema.routes.certificatePeriod.list.meta,
  },
  {
    path: AllTypeSchema.routes.certificatePeriod.create.path,
    name: AllTypeSchema.routes.certificatePeriod.create.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.certificatePeriod.create.meta
  },
  {
    path: AllTypeSchema.routes.certificatePeriod.show.path,
    name: AllTypeSchema.routes.certificatePeriod.show.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.certificatePeriod.show.meta
  },
  {
    path: AllTypeSchema.routes.typeSchedule.list.path,
    name: AllTypeSchema.routes.typeSchedule.list.name,
    component: ListAllTypes,
    meta: AllTypeSchema.routes.typeSchedule.list.meta,
  },
  {
    path: AllTypeSchema.routes.typeSchedule.create.path,
    name: AllTypeSchema.routes.typeSchedule.create.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.typeSchedule.create.meta
  },
  {
    path: AllTypeSchema.routes.typeSchedule.show.path,
    name: AllTypeSchema.routes.typeSchedule.show.name,
    component: CreateAllType,
    meta: AllTypeSchema.routes.typeSchedule.show.meta
  },
];