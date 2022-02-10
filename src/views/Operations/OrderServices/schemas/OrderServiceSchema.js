import { typePageOptions } from '@/utils';
import { list } from '@/utils/icons';
import { statusOrderService } from '@/utils/options';

export default {
    domain: 'order-services',
    title: 'Ordem de Serviços',
    description: 'Lista de todas as ordem de serviços do sisteema.',
    createBtn: 'Nova Ordem',
    formAddress: false,
    showExpand: false,
    routes: {
      list: {
        name: 'orderServices',
        path: '/ordem-servicos',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'orderService-create',
        path: '/ordem-servicos/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'orderService-show',
        path: '/ordem-servicos/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, }
      }
    },
    listActions: {
      has: true,
      noShow: false,
      noDestroy: false,
      situation: false,
      status: true,
      more: {
        has: false,
        items: []
      },
    },
    filters: {
      has: true,
      relations: 'customer',
      items: [
        {
          type: 'select',
          label: 'Status',
          name: 'status',
          items: {
            data: statusOrderService,
          },
          icon: list,
          md: 6,
        },
      ]
    },
    fields: [
      {
        icon: list,
        title: 'Dados da Ordem',
        openGroup: true,
        items: [
          {
            type: 'text',
            name: 'order_number',
            formattedName: 'order_number',
            label: 'Número',
            align: '',
            md: '1',
            list: true,
            readonly: true,
            disabled: false,
          },
          {
            type: 'text',
            name: 'order_date',
            formattedName: 'order_date_formatted',
            label: 'Data',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'customer_id',
            formattedName: 'customer.name',
            label: 'Cliente',
            align: '',
            md: '1',
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'money',
            name: 'subtotal',
            formattedName: 'subtotal_formatted',
            label: 'Sub Total',
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
            name: 'discount',
            formattedName: 'discount_formatted',
            label: 'Desconto',
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
            name: 'amount',
            formattedName: 'amount_formatted',
            label: 'Total Geral',
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
        ],
      },
    ],
    footer: []
  }