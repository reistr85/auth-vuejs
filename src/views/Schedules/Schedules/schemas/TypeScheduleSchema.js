import { typePageOptions } from '@/utils';
import { text, users } from '@/utils/icons';
import { required } from '@/utils/rules';

export default {
  domain: 'allTypes',
  domainSingle: 'allType',
  title: 'Tipo de Agendamento',
  description: 'Lista de todos od tipos de agendamentos cadastrados no sistema',
  createBtn: 'Novo Tipo de Agendamento',
  routes: {
    list: {
      name: 'typeSchedules',
      path: '/tipos-agendamentos',
      meta: { typePage: typePageOptions.list, requiresAuth: true, }
    },
    create: {
      name: 'typeScheduleCreate',
      path: '/tipos-agendamentos/novo',
      meta: { typePage: typePageOptions.create, requiresAuth: true, }
    },
    show: {
      name: 'typeScheduleShow',
      path: '/tipos-agendamentos/:id',
      meta: { typePage: typePageOptions.show, requiresAuth: true, }
    }
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