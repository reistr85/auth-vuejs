import { typePageOptions } from '@/utils';
import { text, certificate } from '@/utils/icons';
import { required } from '@/utils/rules';

export default {
  domain: 'certificates',
  domainSingle: 'certificate',
  title: 'Certificados',
  description: 'Lista de todos os Certificados cadastrados no sistema',
  createBtn: 'Novo Cadastro',
  routes: {
    list: {
      name: 'certificates',
      path: '/certificados',
      meta: { typePage: typePageOptions.list, requiresAuth: true, }
    },
    create: {
      name: 'certificateCreate',
      path: '/certificados/novo',
      meta: { typePage: typePageOptions.create, requiresAuth: true, }
    },
    show: {
      name: 'certificateShow',
      path: '/certificados/:id',
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
      title: 'Dados do Certificado',
      icon: certificate,
      openGroup: true,
      items: [
        {
          type: 'select',
          name: 'certificate_type_id',
          formattedName: 'certificate_type_formatted',
          label: 'Tipo',
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
            endpoint: 'allTypes',
            queryParams: 'type=certificateType',
          },
          itemText: 'name',
          itemValue: 'id'
        },
        {
          type: 'select',
          name: 'certificate_period_id',
          formattedName: 'certificate_period_formatted',
          label: 'Período',
          noSortable: true,
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
            endpoint: 'allTypes',
            queryParams: 'type=certificatePeriod',
          },
          itemText: 'name',
          itemValue: 'id'
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
          name: 'description',
          formattedName: 'description',
          label: 'Descrição',
          align: '',
          md: '4',
          rules: [],
          list: true,
          readonly: false,
          disabled: false,
        },
        {
          type: 'money',
          name: 'price',
          formattedName: 'price_formatted',
          label: 'Preço',
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
  footer: []
};