import { address, industry } from '@/utils/icons';
import { typePageOptions } from '@/utils';
import { required } from '@/utils/rules';
import { cell_phone } from '@/utils/masks';
// import { typeActive } from '@/utils/options';

export default {
  domain: 'companies',
  title: 'Empresas',
  description: 'Lista de todas as empresas cadastradas no sistema',
  createBtn: '',
  formAddress: true,
  routes: {
    list: {
      name: 'companies',
      path: '/empresas',
      meta: { typePage: typePageOptions.list, requiresAuth: true, }
    },
    create: {
      name: 'company-create',
      path: '/empresas/novo',
      meta: { typePage: typePageOptions.create, requiresAuth: true, }
    },
    show: {
      name: 'company-show',
      path: '/empresas/:id',
      meta: { typePage: typePageOptions.show, requiresAuth: true, }
    }
  },
  listActions: {
    has: true,
    noShow: false,
    noDestroy: true,
    more: {
      has: false,
      items: []
    },
  },
  filters: {
    has: false,
    items: []
  },
  fields: [
    {
      title: 'Dados da Empresa',
      icon: industry,
      items: [
        {
          type: 'text',
          name: 'created_at',
          formattedName: 'created_at_formatted',
          label: 'Data Cadastro',
          align: '',
          md: '2',
          rules: [],
          list: true,
          readonly: true,
          disabled: false,
        },
        {
          type: 'text',
          name: 'name',
          formattedName: 'name',
          label: 'Razão Social',
          align: '',
          md: '4',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
        },
        {
          type: 'text',
          name: 'nickname',
          formattedName: 'nickname',
          label: 'Nome Fantasia',
          align: '',
          md: '3',
          rules: [required],
          list: true,
          readonly: false,
          disabled: false,
        },
        {
          type: 'text',
          name: 'email',
          formattedName: 'email',
          label: 'E-mail',
          align: '',
          md: '3',
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
          md: '2',
          rules: [],
          masks: [cell_phone],
          list: true,
          readonly: false,
          disabled: false,
        },
        // {
        //   type: 'select',
        //   name: 'situation',
        //   formattedName: 'situation_formatted',
        //   label: 'Situação',
        //   align: '',
        //   md: '2',
        //   rules: [required],
        //   list: true,
        //   readonly: true,
        //   disabled: false,
        //   items: typeActive,
        //   itemText: 'text',
        //   itemValue: 'value'
        // },
      ],
    },
    {
      title: 'Dados de Endereço',
      address: true,
      icon: address,
      items: []
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