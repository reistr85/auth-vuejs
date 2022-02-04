import { typePageOptions } from '@/utils';
import { text, calendar, list } from '@/utils/icons';
import { required, money } from '@/utils/rules';

export default {
    domain: 'services',
    title: 'Serviços',
    description: 'Lista de todos os serviços no sistema',
    createBtn: 'Novo Serviço',
    routes: {
      list: {
        name: 'services',
        path: '/servicos',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'service-create',
        path: '/servicos/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'service-show',
        path: '/servicos/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, }
      }
    },
    listActions: {
      has: true,
      noShow: false,
      noDestroy: false,
      activateDisable: true,
      more: {
        has: true,
        items: []
      },
    },
    filters: {
      has: true,
      items: [
        {
          type: 'text',
          label: 'Nome',
          field: 'name',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Apelido',
          field: 'nickname',
          icon: text,
          md: 6,
        },
        {
          type: 'select',
          label: 'Tipo de Cadastro',
          field: 'type',
          icon: calendar,
          md: 6,
        },
        {
          type: 'dataPicker',
          label: 'Data do Cadastro',
          field: 'created_at',
          icon: calendar,
          md: 6,
        }
      ]
    },
    fields: [
      {
        icon: list,
        title: 'Dados do Serviço',
        openGroup: true,
        items: [
          {
            type: 'text',
            name: 'code',
            formattedName: 'code',
            label: 'Código',
            align: '',
            md: '2',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'select',
            name: 'category_id',
            formattedName: 'category_formatted',
            label: 'Categoria',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
            items: [],
            service: {
              has: true,
              verb: 'get',
              endpoint: 'filters',
              queryParams: 'domain=all-types&filter[type]=category',
            },
            itemText: 'description',
            itemValue: 'id'
          },
          {
            type: 'select',
            name: 'sub_category_id',
            formattedName: 'sub_category_formatted',
            label: 'Sub Categoria',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
            items: [],
            service: {
              has: true,
              verb: 'get',
              endpoint: 'filters',
              queryParams: 'domain=all-types&filter[type]=sub-category',
            },
            itemText: 'description',
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
            name: 'nickname',
            formattedName: 'nickname',
            label: 'Apelido',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'description',
            formattedName: 'description',
            label: 'Descrição do Serviço',
            align: '',
            md: '9',
            rules: [],
            list: false,
            readonly: false,
            disabled: false,
          },
          {
            type: 'money',
            name: 'cost_value',
            formattedName: 'cost_value_formatted',
            label: 'Valor Custo',
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
            name: 'sale_value',
            formattedName: 'sale_value_formatted',
            label: 'Valor Venda',
            align: '',
            md: '2',
            rules: [money],
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
      }
    ],
    footer: [
      {
        name: 'total_devolutions',
        label: 'Valor Devolvido',
        class: 'custom-footer-value',
        md: 2,
      },
    ]
  }