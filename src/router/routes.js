import { routes as registers } from '@/views/Registers';
import { routes as users } from '@/views/Users';
import { routes as auth } from '@/views/Auth';



export default [
  ...registers,
  ...users,
  ...auth,
]