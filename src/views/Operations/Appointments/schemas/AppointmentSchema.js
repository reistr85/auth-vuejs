import { typePageOptions } from '@/utils';
import { text, list } from '@/utils/icons';

export default {
    domain: 'appointments',
    title: 'Agendamentos',
    description: 'Lista de todos os agendamentos no sistema',
    createBtn: 'Novo Agendamento',
    formAddress: true,
    routes: {
      list: {
        name: 'appointments',
        path: '/agendamentos',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'appointment-create',
        path: '/agendamentos/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'appointment-show',
        path: '/agendamentos/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, }
      }
    },
    listActions: {
      has: true,
      noShow: false,
      noDestroy: false,
      situation: false,
      more: {
        has: true,
        items: []
      },
    },
    filters: {
      has: true,
      items: [
        {
          type: 'select',
          label: 'Tipo de Cadastro',
          name: 'type',
          icon: list,
          md: 6,
        },
        {
          type: 'text',
          label: 'Nome',
          name: 'name',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Nome Fantasia',
          name: 'social_name',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'E-mail',
          name: 'email',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Telefone',
          name: 'phone',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Celular',
          name: 'cell_phone',
          icon: text,
          md: 6,
        },
      ]
    },
    fields: [
      {
        icon: list,
        title: 'Dados do Agendamento',
        openGroup: true,
        items: [
          {
            type: 'text',
            name: 'code',
            formattedName: 'appointment_number',
            label: 'Número',
            align: '',
            md: '1',
            list: true,
            readonly: true,
            disabled: false,
          },
          {
            type: 'text',
            name: 'date_initial',
            formattedName: 'date_initial_formatted',
            label: 'Data/Hora Inicial',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'date_final',
            formattedName: 'date_final_formatted',
            label: 'Data/Hora Final',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
        ],
      },
    ],
    footer: []
  }