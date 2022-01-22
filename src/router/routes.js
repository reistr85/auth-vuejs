import { routes as alltypes } from '@/views/AllTypes';
import { routes as home } from '@/views/Home';
import { routes as registers } from '@/views/Registers';
import { routes as users } from '@/views/Users';
import { routes as auth } from '@/views/Auth';



export default [
  ...alltypes,
  ...home,
  ...registers,
  ...users,
  ...auth,
]