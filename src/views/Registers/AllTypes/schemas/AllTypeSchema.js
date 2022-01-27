import { typePageOptions } from '@/utils';
import { search, text, calendar, list } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeYesNo, typeActive, typeAllTypes } from '@/utils/options';

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
          label: 'Descrição',
          name: 'description',
          icon: text,
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
          type: 'select',
          label: 'Tipo',
          name: 'type',
          icon: calendar,
          md: 6,
        },
        {
          type: 'dataPicker',
          label: 'Data do Cadastro',
          name: 'created_at',
          icon: calendar,
          md: 6,
        }
      ]
    },
    fields: [
      {
        icon: list,
        title: 'Dados do Tipo Geral',
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
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeActive,
            itemText: 'text',
            itemValue: 'value'
          },
        ],
      }
    ],
    footer: []
  }