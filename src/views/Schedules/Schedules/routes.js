import TypeScheduleSchema from './schemas/TypeScheduleSchema';
import ListTypeSchedules from './pages/ListTypeSchedules';
import CreateTypeSchedule from './pages/CreateTypeSchedule';

export default [
  {
    path: TypeScheduleSchema.routes.list.path,
    name: TypeScheduleSchema.routes.list.name,
    component: ListTypeSchedules,
    meta: TypeScheduleSchema.routes.list.meta,
  },
  {
    path: TypeScheduleSchema.routes.create.path,
    name: TypeScheduleSchema.routes.create.name,
    component: CreateTypeSchedule,
    meta: TypeScheduleSchema.routes.create.meta
  },
  {
    path: TypeScheduleSchema.routes.show.path,
    name: TypeScheduleSchema.routes.show.name,
    component: CreateTypeSchedule,
    meta: TypeScheduleSchema.routes.show.meta
  },
];