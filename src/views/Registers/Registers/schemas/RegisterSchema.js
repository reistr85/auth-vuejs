import { typePageOptions } from '@/utils';
import { text, users } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeRegister } from '@/utils/options';

export default {
  domain: 'registers',
  domainSingle: 'register',
  title: 'Cadatros',
  description: 'Lista de todos os Cadatros do sistema',
  createBtn: 'Novo Cadastro',
  routes: {
    list: {
      name: 'registers',
      path: '/cadastros',
      meta: { typePage: typePageOptions.list, requiresAuth: true, }
    },
    create: {
      name: 'registerCreate',
      path: '/cadastros/novo',
      meta: { typePage: typePageOptions.create, requiresAuth: true, }
    },
    show: {
      name: 'registerShow',
      path: '/cadastros/:id',
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
        type: 'select',
        name: 'type',
        label: 'Tipo Usuário',
        icon: text,
        md: 6,
        items: {
          data: typeRegister
        }
      },
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
        label: 'E-mail',
        icon: text,
        md: 6,
      },
      {
        type: 'simpleMask',
        name: 'cell_phone',
        label: 'Celular',
        inputMask: '(##)#####-####',
        outputMask: '(##)#####-####',
        icon: text,
        md: 6,
      },
    ]
  },
  fields: [
    {
      title: 'Dados do Cadastro',
      icon: users,
      openGroup: true,
      items: [
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
          items: typeRegister,
          itemText: 'text',
          itemValue: 'value'
        },
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
          label: 'E-mail',
          align: '',
          md: '4',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
        },
        {
          type: 'text',
          name: 'cell_phone',
          formattedName: 'cell_phone_formatted',
          label: 'Celular',
          align: '',
          md: '3',
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