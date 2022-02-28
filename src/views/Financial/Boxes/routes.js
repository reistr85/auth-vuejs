import BoxSchema from './schemas/BoxSchema';
import ShowBoxMovements from './pages/ShowBoxMovements';
import ListBoxes from './pages/ListBoxes';

export default [
  {
    path: BoxSchema.routes.list.path,
    name: BoxSchema.routes.list.name,
    component: ListBoxes,
    meta: BoxSchema.routes.list.meta,
  },
  // {
  //   path: BoxSchema.routes.create.path,
  //   name: BoxSchema.routes.create.name,
  //   component: ShowBoxMovements,
  //   meta: BoxSchema.routes.create.meta,
  // },s
  {
    path: BoxSchema.routes.show.path,
    name: BoxSchema.routes.show.name,
    component: ShowBoxMovements,
    meta: BoxSchema.routes.show.meta,
  },
]