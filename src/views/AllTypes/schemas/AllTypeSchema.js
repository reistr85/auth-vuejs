import { typePageOptions } from '@/utils';
import { text, users } from '@/utils/icons';
import { required } from '@/utils/rules';

export default {
  domain: 'allTypes',
  domainSingle: 'allType',
  title: 'Tipos Gerais',
  description: 'Lista de cadastros gerais do sistema',
  createBtn: 'Novo Tipo',
  routes: {
    certificateType: {
      list: {
        name: 'certificateTypes',
        path: '/tipos-certificados',
        meta: { typePage: typePageOptions.list, requiresAuth: true, typeAllType: 'certificateType' }
      },
      create: {
        name: 'certificateTypeCreate',
        path: '/tipos-certificados/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, typeAllType: 'certificateType' }
      },
      show: {
        name: 'certificateTypeShow',
        path: '/tipos-certificados/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, typeAllType: 'certificateType' }
      }
    },
    certificatePeriod: {
      list: {
        name: 'certificatePeriods',
        path: '/periodos-certificados',
        meta: { typePage: typePageOptions.list, requiresAuth: true, typeAllType: 'certificatePeriod' }
      },
      create: {
        name: 'certificatePeriodCreate',
        path: '/periodos-certificados/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, typeAllType: 'certificatePeriod' }
      },
      show: {
        name: 'certificatePeriodShow',
        path: '/periodos-certificados/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, typeAllType: 'certificatePeriod' }
      }
    },
    paymentMethod: {
      list: {
        name: 'paymentMethods',
        path: '/forma-pagamentos',
        meta: { typePage: typePageOptions.list, requiresAuth: true, typeAllType: 'paymentMethod' }
      },
      create: {
        name: 'paymentMethodCreate',
        path: '/forma-pagamentos/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, typeAllType: 'paymentMethod' }
      },
      show: {
        name: 'paymentMethodShow',
        path: '/forma-pagamentos/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, typeAllType: 'paymentMethod' }
      }
    },
    typeSchedule: {
      list: {
        name: 'typeSchedules',
        path: '/tipo-agendamento',
        meta: { typePage: typePageOptions.list, requiresAuth: true, typeAllType: 'typeSchedule' }
      },
      create: {
        name: 'typeScheduleCreate',
        path: '/tipo-agendamento/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, typeAllType: 'typeSchedule' }
      },
      show: {
        name: 'typeScheduleShow',
        path: '/tipo-agendamento/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, typeAllType: 'typeSchedule' }
      }
    },
  },
  listActions: {
    has: true,
    noShow: false,
    noDestroy: false,
    more: {
      has: false,
      items: []
    },
  },
  filters: {
    has: true,
    items: [
      {
        type: 'text',
        name: 'name',
        label: 'Nome',
        icon: text,
        md: 12,
      },
    ]
  },
  fields: [
    {
      title: 'Dados do Usuário',
      icon: users,
      openGroup: true,
      items: [
        {
          type: 'text',
          name: 'name',
          formattedName: 'name',
          label: 'Nome',
          align: '',
          md: '4',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
          counter: 100,
        },
        {
          type: 'text',
          name: 'description',
          formattedName: 'description',
          label: 'Decrição',
          align: '',
          md: '8',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
        },
      ],
    },
  ],
  footer: [
    {
      name: 'total_devolutions',
      label: 'Valor Devolvido',
      class: 'customfootervalue',
      md: 2,
    },
  ]
};