import { typePageOptions } from '@/utils';
import { text, calendar, list, clipboardPlusOutline, clipboardMinusOutline, clipboardFlowOutline
} from '@/utils/icons';
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
      noDestroy: false,
      status: true,
      more: {
        has: true,
        items: [
          {
            label: 'Suprimento',
            icon: clipboardPlusOutline,
            action: 'entrance'
          },
          {
            label: 'Sangria',
            icon:   clipboardMinusOutline,
            action: 'withdrawn'
          },
          {
            label: 'Fechamento',
            icon: clipboardFlowOutline,
            action: 'closed'
          },
        ]
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
          name: 'employee',
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
          label: 'Saldo Final',
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
            name: 'employee_id',
            formattedName: 'employee',
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
            label: 'Saldo Final',
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
          }
        ],
      }
    ],
    box_movements: [
      { text: 'Data', value: 'box_movements_date_formatted' },
      { text: 'Origem', value: 'origin_type_formatted' },
      { text: 'Descrição', value: 'description' },
      { text: 'Valor', value: 'total_value_formatted' },
      { text: 'Ações', value: 'actions', align: 'end' },
    ],
    footer: []
  }