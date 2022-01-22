import { routes as alltypes } from '@/views/Registers/AllTypes';
import { routes as auth } from '@/views/Auth';
import { routes as home } from '@/views/Home/Dashboard';
import { routes as registers } from '@/views/Registers/Registers';
import { routes as settings } from '@/views/Settings/Companies';
import { routes as users } from '@/views/Settings/Users';
import { routes as services } from '@/views/Services';



export default [
  ...alltypes,
  ...auth,
  ...home,
  ...registers,
  ...settings,
  ...services,
  ...users,
]