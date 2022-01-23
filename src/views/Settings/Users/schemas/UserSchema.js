import { typePageOptions } from '@/utils';
import { search, text, calendar } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeUser } from '@/utils/options';

export default {
  domain: 'users',
  title: 'Usuários',
  description: 'Lista de todos os usuários cadastrados no sistema',
  createBtn: 'Novo Usuário',
  routes: {
    list: {
      name: 'users',
      path: '/usuarios',
      meta: { typePage: typePageOptions.list, requiresAuth: true, }
    },
    create: {
      name: 'user-create',
      path: '/usuarios/novo',
      meta: { typePage: typePageOptions.create, requiresAuth: true, }
    },
    show: {
      name: 'user-show',
      path: '/usuarios/:id',
      meta: { typePage: typePageOptions.show, requiresAuth: true, }
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
        name: 'name',
        label: 'Nome',
        icon: text,
        md: 6,
      },
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        icon: text,
        md: 6,
      },
      {
        type: 'select',
        name: 'type',
        label: 'Tipo Usuário',
        icon: text,
        md: 6,
        items: {
          data: typeUser
        }
      },
      {
        type: 'dataPicker',
        name: 'created_at',
        label: 'Data de Cadastro',
        icon: calendar,
        md: 6,
      }
    ]
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
          md: '4',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
          counter: 100,
        },
        {
          type: 'text',
          name: 'email',
          formattedName: 'email',
          label: 'Email',
          align: '',
          md: '4',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
        },
        {
          type: 'select',
          name: 'type',
          formattedName: 'type_formatted',
          label: 'Tipo Usuário',
          align: '',
          md: '4',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
          items: typeUser,
          itemText: 'text',
          itemValue: 'value'
        },
        {
          type: 'password',
          name: 'password',
          formattedName: 'password',
          label: 'Senha',
          align: '',
          md: '4',
          rules: [required],
          list: false,
          readonly: false,
          disabled: false,
        },
      ],
    }
  ],
  footer: [
    {
      name: 'total_devolutions',
      label: 'Valor Devolvido',
      class: 'customfootervalue',
      md: 2,
    },
  ]
}