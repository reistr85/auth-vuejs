
import { routes as alltypes } from '@/views/Registers/AllTypes';
import { routes as appointments } from '@/views/Operations/Appointments';
import { routes as auth } from '@/views/Auth';
import { routes as home } from '@/views/Home/Dashboard';
import { routes as registers } from '@/views/Registers/Registers';
import { routes as companies } from '@/views/Settings/Companies';
import { routes as users } from '@/views/Settings/Users';
import { routes as services } from '@/views/Registers/Services';
import { routes as banks } from '@/views/Financial/Banks'


export default [
  ...alltypes,
  ...appointments,
  ...auth,
  ...home,
  ...registers,
  ...companies,
  ...services,
  ...users,
  ...services,
  ...banks,
]