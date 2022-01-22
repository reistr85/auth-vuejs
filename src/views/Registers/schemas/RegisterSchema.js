import { search, text, calendar } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeRegister } from '@/utils/options';

export default {
    domain: 'registers',
    title: 'Cadastros',
    description: 'Lista de todos os cadastros no sistema',
    createBtn: 'Novo Cadastro',
    routes: {
      list: {
        name: 'registers',
        path: '/cadastros',
      },
      create: {
        name: 'register-create',
        path: '/cadastros/novo',
      },
      show: {
        name: 'register-show',
        path: '/cadastros/:id',
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
            md: '5',
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
            type: 'text',
            name: 'code',
            formattedName: 'code',
            label: 'Código',
            align: '',
            md: '3',
            required: true,
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'cnpj',
            formattedName: 'cnpj',
            label: 'CNPJ',
            align: '',
            md: '3',
            required: true,
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'cpf',
            formattedName: 'cpf',
            label: 'CPF',
            align: '',
            md: '3',
            required: true,
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
            required: true,
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'select',
            name: 'type',
            formattedName: 'type_formatted',
            label: 'Tipo de Cadastro',
            align: '',
            md: '3',
            rules: [required],
            list: false,
            readonly: false,
            disabled: false,
            items: typeRegister,
            itemText: 'text',
            itemValue: 'value'
          },
          {
            type: 'text',
            name: 'telephone',
            formattedName: 'telephone',
            label: 'Telefone',
            align: '',
            md: '3',
            required: true,
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'facebook',
            formattedName: 'facebook',
            label: 'Facebook',
            align: '',
            md: '3',
            required: true,
            list: false,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'instagram',
            formattedName: 'instagram',
            label: 'Instagram',
            align: '',
            md: '3',
            required: true,
            list: false,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'twitter',
            formattedName: 'twitter',
            label: 'Twitter',
            align: '',
            md: '3',
            required: true,
            list: false,
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