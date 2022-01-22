import { search, text, calendar } from '@/utils/icons';
import { required } from '@/utils/rules';
// import { typeRegister } from '@/utils/options';

export default {
    domain: 'services',
    title: 'Serviços',
    description: 'Lista de todos os serviços no sistema',
    createBtn: 'Novo Serviço',
    routes: {
      list: {
        name: 'services',
        path: '/servicos',
      },
      create: {
        name: 'service-create',
        path: '/servicos/novo',
      },
      show: {
        name: 'service-show',
        path: '/servicos/:id',
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
        title: 'Dados do Cadastro',
        items: [
          {
            type: 'text',
            name: 'name',
            formattedName: 'name',
            label: 'Nome',
            align: '',
            md: '6',
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
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
          },
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
            type: 'text',
            name: 'cost_value',
            formattedName: 'cost_value',
            label: 'Valor Custo',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'sale_value',
            formattedName: 'sale_value',
            label: 'Valor Venda',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
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