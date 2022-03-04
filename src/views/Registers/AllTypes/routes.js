import AllTypeSchema from './schemas/AllTypeSchema';
import ListAllTypes from './pages/ListAllTypes';
import CreateAllType from './pages/CreateAllType';

export default [
    {//list
      path: AllTypeSchema.routes.list.category.path,
      name: AllTypeSchema.routes.list.category.name,
      component: ListAllTypes,
      meta: AllTypeSchema.routes.list.category.meta,
    },
    {
      path: AllTypeSchema.routes.list.subCategory.path,
      name: AllTypeSchema.routes.list.subCategory.name,
      component: ListAllTypes,
      meta: AllTypeSchema.routes.list.subCategory.meta,
    },
    {
      path: AllTypeSchema.routes.list.payment.path,
      name: AllTypeSchema.routes.list.payment.name,
      component: ListAllTypes,
      meta: AllTypeSchema.routes.list.payment.meta,
    },
    {
      path: AllTypeSchema.routes.list.cardFlag.path,
      name: AllTypeSchema.routes.list.cardFlag.name,
      component: ListAllTypes,
      meta: AllTypeSchema.routes.list.cardFlag.meta,
    },
    {//create
      path: AllTypeSchema.routes.create.category.path,
      name: AllTypeSchema.routes.create.category.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.create.category.meta,
    },
    {
      path: AllTypeSchema.routes.create.subCategory.path,
      name: AllTypeSchema.routes.create.subCategory.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.create.subCategory.meta,
    },
    {
      path: AllTypeSchema.routes.create.payment.path,
      name: AllTypeSchema.routes.create.payment.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.create.payment.meta,
    },
    {
      path: AllTypeSchema.routes.create.cardFlag.path,
      name: AllTypeSchema.routes.create.cardFlag.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.create.cardFlag.meta,
    },
    {//show
      path: AllTypeSchema.routes.show.category.path,
      name: AllTypeSchema.routes.show.category.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.show.category.meta,
    },
    {
      path: AllTypeSchema.routes.show.subCategory.path,
      name: AllTypeSchema.routes.show.subCategory.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.show.subCategory.meta,
    },
    {
      path: AllTypeSchema.routes.show.payment.path,
      name: AllTypeSchema.routes.show.payment.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.show.payment.meta,
    },
    {
      path: AllTypeSchema.routes.show.cardFlag.path,
      name: AllTypeSchema.routes.show.cardFlag.name,
      component: CreateAllType,
      meta: AllTypeSchema.routes.show.cardFlag.meta,
    }
]