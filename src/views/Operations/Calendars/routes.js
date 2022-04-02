import CalendarSchema from './schemas/CalendarSchema';
import ListCalendars from './pages/ListCalendars';

export default [
  {
    path: CalendarSchema.routes.list.path,
    name: CalendarSchema.routes.list.name,
    component: ListCalendars,
    meta: CalendarSchema.routes.list.meta,
  },
];