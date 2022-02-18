import { typePageOptions } from '@/utils';
import { text, list } from '@/utils/icons';
import { statusAppointment } from '@/utils/options';

export default {
    domain: 'appointments',
    title: 'Agendamentos',
    description: 'Lista de todos os agendamentos no sistema',
    createBtn: '',
    formAddress: true,
    showExpand: false,
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
      relations: 'customer,collaborator',
      items: [
        {
          type: 'select',
          label: 'Status',
          name: 'status',
          items: {
            data: statusAppointment,
          },
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
            name: 'appointment_date',
            formattedName: 'appointment_date_formatted',
            label: 'Data',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'initial_hour',
            formattedName: 'initial_hour_formatted',
            label: 'Início',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'final_hour',
            formattedName: 'final_hour_formatted',
            label: 'Fim',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'collaborator_id',
            formattedName: 'collaborator.name',
            label: 'Colaborador',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'customer_id',
            formattedName: 'customer.name',
            label: 'Cliente',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'status',
            formattedName: 'status_formatted',
            label: 'Status',
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