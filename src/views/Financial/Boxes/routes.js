import BoxSchema from './schemas/BoxSchema';
import ShowBox from './pages/ShowBox';
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
  //   component: ShowBox,
  //   meta: BoxSchema.routes.create.meta,
  // },
  {
    path: BoxSchema.routes.show.path,
    name: BoxSchema.routes.show.name,
    component: ShowBox,
    meta: BoxSchema.routes.show.meta,
  },
];