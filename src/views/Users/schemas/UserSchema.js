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
    },
    create: {
      name: 'usercreate',
      path: '/usuarios/novo',
    },
    show: {
      name: 'usershow',
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
  filters: {
    has: true,
    items: [
      {
        type: 'text',
        label: 'Nome',
        field: 'name',
        icon: text,
        md: 6,
      },
      {
        type: 'text',
        label: 'Email',
        field: 'email',
        icon: text,
        md: 6,
      },
      {
        type: 'select',
        label: 'Tipo Usuário',
        field: 'type',
        icon: text,
        md: 6,
      },
      {
        type: 'dataPicker',
        label: 'Data de Cadastro',
        field: 'created_at',
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
          list: true,
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