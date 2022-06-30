import { routes as auth } from '@/views/Auth';
import { routes as home } from '@/views/Home/Dashboard';
import { routes as users } from '@/views/Settings/Users';
import { routes as typeSchedules } from '@/views/Schedules/TypeSchedules';


export default [
  ...auth,
  ...home,
  ...users,
  ...typeSchedules,
];