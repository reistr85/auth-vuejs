import { typePageOptions } from '@/utils';
import { text, list } from '@/utils/icons';
import { required } from '@/utils/rules';
import locales from '@/locales/pt-BR';
import { typeYesNo, typeSituation, typeAllTypes } from '@/utils/options';

export default {
    domain: 'all-types',
    title: 'Tipos Gerais',
    description: 'Lista de todos os tipos gerais do sistema',
    createBtn: 'Novo Tipo',
    routes: {
      list: {
        name: 'alltypes',
        path: '/tipos',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'alltype-create',
        path: '/tipos/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'alltype-show',
        path: '/tipos/:id',
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
          { ...locales.dynamicListPage.listActions, },
        ]
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
          {
            type: 'select',
            name: 'situation',
            formattedName: 'situation_formatted',
            label: 'Situação',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
            noForm: true,
            items: typeSituation,
            itemText: 'text',
            itemValue: 'value'
          },
        ],
      }
    ],
    footer: []
  }