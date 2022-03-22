// Auth
import AuthSchema from '@/views/Auth/schemas/AuthSchema';

// Financial
import BankSchema from '@/views/Financial/Banks/schemas/BankSchema';

// Home
import HomeSchema from '@/views/Home/Dashboard/schemas/HomeSchema';

// Operations
import AppointmentSchema from '@/views/Operations/Appointments/schemas/AppointmentSchema';
import CalendarSchema from '@/views/Operations/Calendars/schemas/CalendarSchema';
import OrderServiceSchema from '@/views/Operations/OrderServices/schemas/OrderServiceSchema';

// Registers
import AllTypeSchema from '@/views/Registers/AllTypes/schemas/AllTypeSchema';
import RegisterSchema from '@/views/Registers/Registers/schemas/RegisterSchema';
import ServiceSchema from '@/views/Registers/Services/schemas/ServiceSchema';
import InstallmentTypeSchema from '@/views/Registers/InstallmentTypes/schemas/InstallmentTypeSchema';

// Settings
import CompanySchema from '@/views/Settings/Companies/schemas/CompanySchema';
import UserSchema from '@/views/Settings/Users/schemas/UserSchema';

const schemas = Object.freeze({
  auth: AuthSchema,
  bank: BankSchema,
  home: HomeSchema,
  appointment: AppointmentSchema,
  calendar: CalendarSchema,
  orderService: OrderServiceSchema,
  allType: AllTypeSchema,
  register: RegisterSchema,
  service: ServiceSchema,
  installmentType: InstallmentTypeSchema,
  companies: CompanySchema,
  users: UserSchema,
});

export default {
  install: function (Vue) {
    Vue.prototype.$schemas = schemas;
    Vue.schemas = schemas;
  }
};