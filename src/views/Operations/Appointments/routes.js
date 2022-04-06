import AppointmentSchema from './schemas/AppointmentSchema';
import ListAppointments from './pages/ListAppointments';
import CreateAppointment from './pages/CreateAppointment';
// import CreateAppointment from './pages/CreateAppointment';

export default [
  {
    path: AppointmentSchema.routes.list.path,
    name: AppointmentSchema.routes.list.name,
    component: ListAppointments,
    meta: AppointmentSchema.routes.list.meta,
  },
  {
    path: AppointmentSchema.routes.create.path,
    name: AppointmentSchema.routes.create.name,
    component: CreateAppointment,
    meta: AppointmentSchema.routes.create.meta,
  },
  {
    path: AppointmentSchema.routes.show.path,
    name: AppointmentSchema.routes.show.name,
    component: CreateAppointment,
    meta: AppointmentSchema.routes.show.meta,
  },
];