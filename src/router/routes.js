import { routes as auth } from '@/views/Auth';
import { routes as home } from '@/views/Home/Dashboard';
import { routes as users } from '@/views/Settings/Users';
import { routes as typeSchedules } from '@/views/Schedules/TypeSchedules';
import { routes as allTypes } from '@/views/AllTypes';
import { routes as registers } from '@/views/Registers/Registers';
import { routes as certificates } from '@/views/Registers/Certificates';
import { routes as certificateTypes } from '@/views/Registers/CertificateTypes';


export default [
  ...auth,
  ...home,
  ...users,
  ...typeSchedules,
  ...allTypes,
  ...registers,
  ...certificates,
  ...certificateTypes,
];