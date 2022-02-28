import { typePageOptions } from '@/utils';
import { text, calendar, list } from '@/utils/icons';
import { required } from '@/utils/rules';

export default {
    domain: 'boxes',
    title: 'Caixas',
    description: 'Lista de todos os caixas abertos no sistema',
    createBtn: false,
    formAddress: false,
    showExpand: false,
    routes: {
      list: {
        name: 'boxes',
        path: '/caixas',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'box-create',
        path: '/caixas/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'box-show',
        path: '/caixas/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, }
      }
    },
    listActions: {
      has: true,
      noShow: false,
      noDestroy: true,
      situation: false,
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
          label: 'Data',
          name: 'box_date',
          icon: calendar,
          md: 6,
        },
        {
          type: 'text',
          label: 'Funcionário',
          name: 'collaborator.name',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Valor Inicial',
          name: 'initial_value',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Valor Total',
          name: 'total_value',
          icon: text,
          md: 6,
        }
      ]
    },
    fields: [
      {
        icon: list,
        title: 'Dados do Caixa',
        openGroup: true,
        items: [
          {
            type: 'dataPicker',
            name: 'box_date',
            formattedName: 'box_date_formatted',
            label: 'Data Abertura',
            align: '',
            md: '2',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
            noInitial: false,
            now: false,
          },
          {
            type: 'text',
            name: 'collaborator_id',
            formattedName: 'collaborator.name',
            label: 'Funcionário',
            align: '',
            md: '6',
            rules: [],
            list: true,
            readonly: false,
            disabled: true,
          },
          {
            type: 'money',
            name: 'initial_value',
            formattedName: 'initial_value_formatted',
            label: 'Valor Inicial',
            align: '',
            md: '2',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
            clearable: false,
            prefix: 'R$',
            length: 11,
            precision: 2,
            empty: null,
          },
          {
            type: 'money',
            name: 'total_value',
            formattedName: 'total_value_formatted',
            label: 'Valor Final',
            align: '',
            md: '2',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            clearable: false,
            prefix: 'R$',
            length: 11,
            precision: 2,
            empty: null,
          },
          {
            type: 'text',
            name: 'status',
            formattedName: 'status_formatted',
            label: 'Status',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: true,
          },
        ],
      }
    ],
    box_movements: [
      { text: 'Data', value: 'box_movements_date' },
      { text: 'Origem', value: 'origin_type' },
      { text: 'Descrição', value: 'description' },
      { text: 'Valor', value: 'total_value' },
      { text: 'Ações', value: 'actions', align: 'end' },
    ],
    footer: []
  }