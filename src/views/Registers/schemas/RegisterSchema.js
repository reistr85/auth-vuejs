import { search } from '@/utils/icons';

export default {
    domain: 'registers',
    title: 'Cadastros',
    description: 'Lista de todos os cadastros no sistema',
    createBtn: 'Novo Cadastro',
    routes: {
      list: {
        name: 'registers',
        path: '/cadastros',
      },
      create: {
        name: 'register-create',
        path: '/cadastros/novo',
      },
      show: {
        name: 'register-show',
        path: '/cadastros/:id',
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
    filters: {
      has: true,
      items: [
        {
          type: 'text',
          label: 'Nome',
          field: 'name',
          md: 6,
        },
        {
          type: 'text',
          label: 'Apelido',
          field: 'nickname',
          md: 6,
        },
        {
          type: 'select',
          label: 'Tipo de Cadastro',
          field: 'type',
          md: 6,
        },
        {
          type: 'dataPicker',
          label: 'Data do Cadastro',
          field: 'created_at',
          md: 6,
        }
      ]
    },
    fields: [
      {
        title: 'Dados do Cadastro',
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
            name: 'nickname',
            formattedName: 'nickname',
            label: 'Apelido',
            align: '',
            md: '5',
            required: true,
            list: true,
          },
          {
            type: 'text',
            name: 'type',
            formattedName: 'type_formatted',
            label: 'Tipo Cadastro',
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