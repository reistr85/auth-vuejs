import {
  account,
  accountSettings,
  bank,
  box,
  calendar,
  calendarEdit,
  chart,
  financial,
  home,
  list,
  sale,
  tune, 
} from '@/utils/icons';

export default [
  {
    active: false,
    menuGroupName: 'home',
    icon: home,
    title: 'Início',
    items: [{ icon: chart, title: 'Dashboard', route: 'home' }],
  },
  {
    active: false,
    menuGroupName: 'register',
    icon: account,
    action: account,
    title: 'Cadastros',
    items: [
      { icon: accountSettings, title: 'Registros', route: 'registers', active: false },
      { icon: tune, title: 'Serviços', route: 'services', active: false },
      { icon: list, title: 'Categorias', route: 'categories', active: false },
      { icon: list, title: 'Sub Categorias', route: 'subcategories', active: false },
      { icon: list, title: 'Formas de Pagamento', route: 'payments', active: false },
      { icon: list, title: 'Bandeira de Cartão', route: 'cardflag', active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'operations',
    icon: sale,
    title: 'Operações',
    items: [
      { icon: calendarEdit, title: 'Minha Agenda', route: 'calendars', active: false },
      { icon: calendar, title: 'Agendamentos', route: 'appointments', active: false },
      { icon: tune, title: 'Ordem de Serviços', route: 'orderServices', active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'financial',
    icon: financial,
    title: 'Financeiro',
    items: [
      { icon: bank, title: 'Bancos', route: 'banks', active: false },
      { icon: box, title: 'Caixa', route: 'boxes', active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'reports',
    icon: chart,
    title: 'Relatórios',
    items: [
      { icon: calendar, title: 'Agendamentos', route: 'reportappointments', active: false },
      { icon: tune, title: 'Ordem de Serviços', route: 'reportorderservices', active: false },
      { icon: sale, title: 'Caixa', route: 'reportboxes', active: false },
      { icon: account, title: 'Clientes', route: 'reportcustomers', active: false },
    ],
  },
]