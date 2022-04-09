
import { routes as allTypes } from '@/views/Registers/AllTypes';
import { routes as appointments } from '@/views/Operations/Appointments';
import { routes as auth } from '@/views/Auth';
import { routes as accountpayments } from '@/views/Financial/AccountPayments';
import { routes as accountreceives } from '@/views/Financial/AccountReceives';
import { routes as banks } from '@/views/Financial/Banks';
import { routes as boxes } from '@/views/Financial/Boxes';
import { routes as calendars } from '@/views/Operations/Calendars';
import { routes as companies } from '@/views/Settings/Companies';
import { routes as installmentTypes } from '@/views/Registers/InstallmentTypes';
import { routes as home } from '@/views/Home/Dashboard';
import { routes as orderServices } from '@/views/Operations/OrderServices';
import { routes as registers } from '@/views/Registers/Registers';
import { routes as services } from '@/views/Registers/Services';
import { routes as users } from '@/views/Settings/Users';


export default [
  ...allTypes,
  ...appointments,
  ...auth,
  ...accountpayments,
  ...accountreceives,
  ...banks,
  ...boxes,
  ...calendars,
  ...companies,
  ...installmentTypes,
  ...home,
  ...orderServices,
  ...registers,
  ...services,
  ...users,
];