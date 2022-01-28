import { typePageOptions } from '@/utils';
import { search, text, calendar, address, list } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeRegister } from '@/utils/options';

export default {
    domain: 'registers',
    title: 'Cadastros',
    description: 'Lista de todos os cadastros no sistema',
    createBtn: 'Novo Cadastro',
    formAddress: true,
    routes: {
      list: {
        name: 'registers',
        path: '/cadastros',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'register-create',
        path: '/cadastros/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'register-show',
        path: '/cadastros/:id',
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
          label: 'Nome',
          name: 'name',
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
          type: 'text',
          label: 'E-mail',
          name: 'email',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Telefone',
          name: 'telephone',
          icon: text,
          md: 6,
        },
        {
          type: 'select',
          label: 'Tipo de Cadastro',
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
        title: 'Dados do Cadastro',
        openGroup: true,
        items: [
          {
            type: 'select',
            name: 'type',
            formattedName: 'type_formatted',
            label: 'Tipo de Cadastro',
            align: '',
            md: '3',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeRegister,
            itemText: 'text',
            itemValue: 'value'
          },
          {
            type: 'text',
            name: 'code',
            formattedName: 'code',
            label: 'Código',
            align: '',
            md: '2',
            required: true,
            list: true,
            readonly: false,
            disabled: false,
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
            required: true,
            list: false,
            readonly: false,
            disabled: false,
          },
          {
            type: 'simpleMask',
            name: 'cnpj',
            formattedName: 'cnpj_formatted',
            label: 'CNPJ',
            align: '',
            md: '3',
            required: true,
            list: false,
            readonly: false,
            disabled: false,
            clearable: true,
            inputMask: '##.###.###/####-##',
            outputMask: '##############',
            applyAfter: false,
            empty: null,
          },
          {
            type: 'simpleMask',
            name: 'cpf',
            formattedName: 'cpf_formatted',
            label: 'CPF',
            align: '',
            md: '3',
            required: true,
            list: false,
            readonly: false,
            disabled: false,
            inputMask: '###.###.###-##',
            outputMask: '###########',
            applyAfter: false,
            empty: null,
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
            type: 'simpleMask',
            name: 'telephone',
            formattedName: 'telephone_formatted',
            label: 'Telefone',
            align: '',
            md: '3',
            required: true,
            list: true,
            readonly: false,
            disabled: false,
            inputMask: '(##)#####-####',
            outputMask: '###########',
            applyAfter: false,
            empty: null,
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
      },
      {
        icon: address,
        title: 'Dados de Endereço',
        openGroup: true,
        address: true,
        required: true,
        items: []
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