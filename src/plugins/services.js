// Auth
import AuthService from '@/views/Auth/services/AuthService';

// Financial
import AccountPaymentsService, { AccountPaymentsCommands } from '@/views/Financial/AccountPayments/services/AccountPaymentsService';
import AccountPaymentInstallmentsService from '@/views/Financial/AccountPayments/services/AccountPaymentInstallmentsService';
import BanksService, { BanksCommands } from '@/views/Financial/Banks/services/BanksService';
import BankMovementsService from '@/views/Financial/Banks/services/BankMovementsService';

// Operations
import AppointmentsService from '@/views/Operations/Appointments/services/AppointmentsService';
import CalendarsService from '@/views/Operations/Calendars/services/CalendarsService';
import OrderServicesService, { OrdderServiceCommands } from '@/views/Operations/OrderServices/services/OrderServicesService';

// Registers
import AllTypesService from '@/views/Registers/AllTypes/services/AllTypesService';
import InstallmentTypesService, { InstallmentTypesCommands }  from '@/views/Registers/InstallmentTypes/services/InstallmentTypesService';
import RegistersService from '@/views/Registers/Registers/services/RegistersService';
import ServicesService from '@/views/Registers/Services/services/ServicesService';
import BoxesService, { BoxesCommands } from '@/views/Financial/Boxes/services/BoxesService';
import BoxMovementsService from '@/views/Financial/Boxes/services/BoxMovementsService';

// Settings
import CompaniesService, { CompaniesCommands } from '@/views/Settings/Companies/services/CompaniesService';
import UsersService from '@/views/Settings/Users/services/UsersService';

const api = Object.freeze({
  // Auth
  auth: AuthService,

  // Financial
  accountPayments: { ...AccountPaymentsService, ...AccountPaymentsCommands() },
  accountPaymentInstallments: AccountPaymentInstallmentsService,
  banks: { ...BanksService, ...BanksCommands() },
  bankMovements: BankMovementsService,

  // Operations
  appointments: AppointmentsService,
  calendars: CalendarsService,
  orderServices: { ...OrderServicesService, ...OrdderServiceCommands() },

  // Registers
  allTypes: AllTypesService,
  installmentTypes: { ...InstallmentTypesService, ...InstallmentTypesCommands() },
  registers: RegistersService,
  services: ServicesService,
  boxes: { ...BoxesService, ...BoxesCommands() },
  boxMovements: BoxMovementsService,
  
  // Settings
  companies: { ...CompaniesService, ...CompaniesCommands() },
  users: UsersService,
});

export default {
  install: function (Vue) {
    Vue.prototype.$api = api;
    Vue.api = api;
  }
};