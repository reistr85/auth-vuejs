import { search, text, calendar } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeYesNo, typeActive, typeAllTypes } from '@/utils/options';

export default {
    domain: 'alltypes',
    title: 'Categorias',
    description: 'Lista de todas as categorias no sistema',
    createBtn: 'Nova Categoria',
    routes: {
      list: {
        name: 'alltypes',
        path: '/categorias',
      },
      create: {
        name: 'alltype-create',
        path: '/categorias/novo',
      },
      show: {
        name: 'alltype-show',
        path: '/categorias/:id',
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
          field: 'description',
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
          label: 'Tipo',
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
        title: 'Dados da Categoria',
        items: [
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
            list: false,
            readonly: false,
            disabled: false,
          },
          {
            type: 'select',
            name: 'use_nickname',
            formattedName: 'use_nickname_formatted',
            label: 'Usar Apelido',
            align: '',
            md: '2',
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
            formattedName: 'type_formatted',
            label: 'Ativo',
            align: '',
            md: '2',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeActive,
            itemText: 'text',
            itemValue: 'value'
          },
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