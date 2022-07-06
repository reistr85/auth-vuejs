import { typePageOptions } from '@/utils';
import { text, users } from '@/utils/icons';
import { required } from '@/utils/rules';

export default {
  domain: 'allTypes',
  domainSingle: 'allType',
  title: 'Tipos de Certificado',
  description: 'Lista de todos os Tipos de Certificado cadastrados no sistema',
  createBtn: 'Novo Cadastro',
  routes: {
    list: {
      name: 'certificateTypes',
      path: '/tipos-certificados',
      meta: { typePage: typePageOptions.list, requiresAuth: true, }
    },
    create: {
      name: 'certificateTypeCreate',
      path: '/tipos-certificados/novo',
      meta: { typePage: typePageOptions.create, requiresAuth: true, }
    },
    show: {
      name: 'certificateTypeShow',
      path: '/tipos-certificados/:id',
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
        md: 6,
      },
      {
        type: 'text',
        name: 'description',
        label: 'Descrição',
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
          label: 'Descrição',
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