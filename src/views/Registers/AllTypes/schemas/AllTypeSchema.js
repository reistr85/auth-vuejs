import { typePageOptions } from '@/utils';
import { text, list } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeYesNo, typeAllTypes } from '@/utils/options';

export default {
    domain: 'all-types',
    title: 'Tipos Gerais',
    description: 'Lista de todos os tipos gerais do sistema',
    createBtn: 'Novo Tipo',
    formAddress: false,
    routes: {
      list: {
        category: {
          name: 'categories',
          path: '/categorias',
          meta: { typePage: typePageOptions.list, requiresAuth: true, }
        },
        subCategory: {
          name: 'subcategories',
          path: '/sub-categorias',
          meta: { typePage: typePageOptions.list, requiresAuth: true, }
        },
        payment: {
          name: 'paymentmethods',
          path: '/pagamentos',
          meta: { typePage: typePageOptions.list, requiresAuth: true, }
        },
        cardFlag: {
          name: 'cardflags',
          path: '/bandeiras',
          meta: { typePage: typePageOptions.list, requiresAuth: true, }
        }
      },
      create: {
        category: {
          name: 'categories-create',
          path: '/categorias/novo',
          meta: { typePage: typePageOptions.create, requiresAuth: true, }
        },
        subCategory: {
          name: 'subcategories-create',
          path: '/sub-categorias/novo',
          meta: { typePage: typePageOptions.create, requiresAuth: true, }
        },
        payment: {
          name: 'paymentmethods-create',
          path: '/pagamentos/novo',
          meta: { typePage: typePageOptions.create, requiresAuth: true, }
        },
        cardFlag: {
          name: 'cardflags-create',
          path: '/bandeiras/novo',
          meta: { typePage: typePageOptions.create, requiresAuth: true, }
        }
      },
      show: {
        category: {
          name: 'categories-show',
          path: '/categorias/:id',
          meta: { typePage: typePageOptions.show, requiresAuth: true, }
        },
        subCategory: {
          name: 'subcategories-show',
          path: '/sub-categorias/:id',
          meta: { typePage: typePageOptions.show, requiresAuth: true, }
        },
        payment: {
          name: 'paymentmethods-show',
          path: '/pagamentos/:id',
          meta: { typePage: typePageOptions.show, requiresAuth: true, }
        },
        cardFlag: {
          name: 'cardflags-show',
          path: '/bandeiras/:id',
          meta: { typePage: typePageOptions.show, requiresAuth: true, }
        }
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
      items: [
        {
          type: 'select',
          label: 'Tipo',
          name: 'type',
          icon: list,
          items: {
            data: typeAllTypes,
          },
          md: 6,
        },
        {
          type: 'text',
          label: 'Apelido',
          name: 'nickname',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Descrição',
          name: 'description',
          icon: text,
          md: 12,
        },
      ]
    },
    fields: [
      {
        icon: list,
        title: 'Dados do Tipo Geral',
        openGroup: true,
        items: [
          {
            type: 'select',
            name: 'type',
            formattedName: 'type_formatted',
            label: 'Tipo',
            align: '',
            md: '4',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeAllTypes,
            itemText: 'text',
            itemValue: 'value'
          },
          {
            type: 'text',
            name: 'description',
            formattedName: 'description',
            label: 'Descrição',
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
            name: 'nickname',
            formattedName: 'nickname',
            label: 'Apelido',
            align: '',
            md: '4',
            required: true,
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'select',
            name: 'use_nickname',
            formattedName: 'use_nickname_formatted',
            label: 'Usar Apelido',
            align: '',
            md: '3',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeYesNo,
            default: 'no',
            itemText: 'text',
            itemValue: 'value'
          },
        ],
      }
    ],
    footer: []
  }