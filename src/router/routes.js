import { routes as auth } from '@/views/Auth';
import { routes as home } from '@/views/Home/Dashboard';
import { routes as users } from '@/views/Settings/Users';


export default [
  ...auth,
  ...home,
  ...users,
];