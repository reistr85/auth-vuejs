import { typePageOptions } from '@/utils';
import { text, calendar, users } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeUser } from '@/utils/options';

export default {
  domain: 'users',
  title: 'Usuários',
  description: 'Lista de todos os usuários cadastrados no sistema',
  createBtn: 'Novo Usuário',
  showInactive: true,
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
    situation: true,
    more: {
      has: true,
      items: []
    },
  },
  filters: {
    has: true,
    title: 'Title',
    openGroup: true,
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
      icon: users,
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
          items: [],
          service: {
            has: true,
            optional: false,
            verb: 'get',
            domain: 'allTypes',
            endpoint: 'filters',
            queryParams: 'domain=all-types&filter[type]=category',
          },
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
        {
          type: 'percent',
          name: 'number_value',
          formattedName: 'number_value',
          label: 'Percentual',
          align: '',
          md: '4',
          rules: [required],
          list: false,
          readonly: false,
          disabled: false,
          clearable: false,
          suffix: '%',
          length: 4,
          precision: 2,
          empty: null,
        },
        {
          type: 'money',
          name: 'value',
          formattedName: 'value',
          label: 'Valor',
          align: '',
          md: '4',
          rules: [required],
          list: false,
          readonly: false,
          disabled: false,
          clearable: false,
          prefix: 'R$',
          length: 11,
          precision: 2,
          empty: null,
        },
        {
          type: 'integer',
          name: 'phone',
          formattedName: 'phone',
          label: 'Valor',
          align: '',
          md: '4',
          rules: [required],
          list: false,
          readonly: false,
          disabled: false,
          clearable: true,
          inputMask: '(##)#####-####',
          outputMask: '###########',
          applyAfter: false,
          empty: null,
        },
        {
          type: 'simpleMask',
          name: 'phone',
          formattedName: 'phone',
          label: 'Valor',
          align: '',
          md: '4',
          rules: [required],
          list: false,
          readonly: false,
          disabled: false,
          clearable: true,
          inputMask: '(##)#####-####',
          outputMask: '###########',
          applyAfter: false,
          empty: null,
          alphanumeric: true
        },
        {
          type: 'dataPicker',
          name: 'birth',
          formattedName: 'birth',
          label: 'Nascimento',
          align: '',
          md: '2',
          rules: [],
          list: false,
          readonly: false,
          disabled: false,
          noInitial: false,
          now: false,
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
  ],
};
