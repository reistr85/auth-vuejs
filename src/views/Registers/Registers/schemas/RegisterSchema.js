import { typePageOptions } from '@/utils';
import { search, text, address, list } from '@/utils/icons';
import { required, requiredSelectMultiple } from '@/utils/rules';
import { typeRegister, typePerson } from '@/utils/options';

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
          type: 'select',
          label: 'Tipo de Cadastro',
          name: 'type',
          icon: list,
          md: 6,
        },
        {
          type: 'text',
          label: 'Nome',
          name: 'name',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Nome Fantasia',
          name: 'social_name',
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
          name: 'phone',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Celular',
          name: 'cell_phone',
          icon: text,
          md: 6,
        },
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
            rules: [requiredSelectMultiple],
            list: true,
            readonly: false,
            disabled: false,
            multiple: true,
            items: typeRegister,
            itemText: 'text',
            itemValue: 'value'
          },
          {
            type: 'select',
            name: 'type_person',
            formattedName: 'type_person_formatted',
            label: 'Tipo Pessoa',
            align: '',
            md: '3',
            rules: [required],
            list: false,
            readonly: false,
            disabled: false,
            items: typePerson,
            default: typePerson[0].value,
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
            name: 'social_name',
            formattedName: 'social_name',
            label: 'Nome Fantasia',
            align: '',
            md: '3',
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
            list: false,
            readonly: false,
            disabled: false,
          },
          {
            type: 'percent',
            name: 'commission_percentage',
            formattedName: 'commission_percentage',
            label: 'Percentual Comissão',
            align: '',
            md: '3',
            rules: [],
            list: false,
            readonly: false,
            disabled: false,
            clearable: false,
            suffix: '%',
            length: 4,
            precision: 2,
            empty: null,
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