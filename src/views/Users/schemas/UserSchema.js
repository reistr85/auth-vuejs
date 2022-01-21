import { search } from '@/utils/icons';

export default {
    domain: 'users',
    title: 'Usuários',
    description: 'Lista de todos os usuários cadastrados no sistema',
    createBtn: 'Novo Usuário',
    routes: {
      list: {
        name: 'users',
        path: '/usuarios',
      },
      create: {
        name: 'user-create',
        path: '/usuarios/novo',
      },
      show: {
        name: 'user-show',
        path: '/usuarios/:id',
      }
    },
    listActions: {
      has: true,
      noShow: false,
      noDestroy: false,
      more: {
        has: true,
        items: [
          {
            icon: search,
            label: 'Alterar Permisões',
            action: 'alterPermitions'
          }
        ]
      },
    },
    fields: [
      {
        title: 'Dados do Usuário',
        items: [
          {
            type: 'text',
            name: 'name',
            formattedName: 'name',
            label: 'Nome',
            align: '',
            md: '5',
            required: true,
            list: true,
          },
          {
            type: 'text',
            name: 'email',
            formattedName: 'email',
            label: 'E-mail',
            align: '',
            md: '5',
            required: true,
            list: true,
          },
          {
            type: 'text',
            name: 'type',
            formattedName: 'type_formatted',
            label: 'Tipo Usuário',
            align: '',
            md: '5',
            required: true,
            list: true,
          },
        ],
      }
    ],
    footer: [
      {
        name: 'total_devolutions',
        label: 'Valor Devolvido',
        class: 'custom-footer-value',
        md: 2,
      },
    ]
  }