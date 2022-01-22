import { routes as alltypes } from '@/views/Registers/AllTypes';
import { routes as home } from '@/views/Home/Dashboard';
import { routes as registers } from '@/views/Registers/Registers';
import { routes as users } from '@/views/Settings/Users';
import { routes as auth } from '@/views/Auth';



export default [
  ...alltypes,
  ...home,
  ...registers,
  ...users,
  ...auth,
]