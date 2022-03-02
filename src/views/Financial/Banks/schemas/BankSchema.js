import { typePageOptions } from '@/utils';
import { text, calendar, list } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeAccount, typeBankNumber } from '@/utils/options';

export default {
    domain: 'banks',
    title: 'Bancos',
    description: 'Lista de todos os bancos no sistema',
    createBtn: 'Novo Banco',
    formAddress: false,
    routes: {
      list: {
        name: 'banks',
        path: '/bancos',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'bank-create',
        path: '/bancos/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'bank-show',
        path: '/bancos/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, }
      },
      statement: {
        name: 'bank-statement',
        path: '/bancos/:id/extrato',
        meta: { typePage: typePageOptions.statement, requiresAuth: true, }
      },
    },
    listActions: {
      has: true,
      noShow: false,
      noDestroy: false,
      situation: true,
      more: {
        has: true,
        items: [
          {
            label: 'Extrato Bancário',
            icon: text,
            action: 'bankStatement'
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
          md: 4,
        },
        {
          type: 'text',
          label: 'Código',
          name: 'code',
          icon: text,
          md: 6,
        },
        {
          type: 'text',
          label: 'Conta',
          name: 'account',
          icon: text,
          md: 6,
        },
        {
          type: 'select',
          label: 'Tipo de Conta',
          name: 'type_bank',
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
        title: 'Dados do Banco',
        openGroup: true,
        items: [
          {
            type: 'text',
            name: 'description',
            formattedName: 'description',
            label: 'Descrição',
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
            md: '3',
            rules: [],
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
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'agency',
            formattedName: 'agency',
            label: 'Agência',
            align: '',
            md: '3',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'account',
            formattedName: 'account',
            label: 'Conta',
            align: '',
            md: '3',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'select',
            name: 'account_type',
            formattedName: 'account_type_formatted',
            label: 'Tipo de Conta',
            align: '',
            md: '3',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeAccount,
            itemText: 'text',
            itemValue: 'value'
          },
          {
            type: 'select',
            name: 'bank_number',
            formattedName: 'bank_number_formatted',
            label: 'Número do Banco',
            align: '',
            md: '3',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeBankNumber,
            itemText: 'text',
            itemValue: 'value'
          },
          {
            type: 'dataPicker',
            name: 'date_opening',
            formattedName: 'date_opening',
            label: 'Data da Abertura',
            align: '',
            md: '3',
            rules: [],
            list: false,
            readonly: false,
            disabled: false,
            noInitial: false,
            now: false,
          },
          {
            type: 'text',
            name: 'observation',
            formattedName: 'observation',
            label: 'Observação',
            align: '',
            md: '6',
            rules: [],
            list: false,
            readonly: false,
            disabled: false,
          },
          {
            type: 'password',
            name: 'password',
            formattedName: 'password',
            label: 'Senha',
            align: '',
            md: '3',
            rules: [],
            list: false,
            readonly: false,
            disabled: false,
          },
        ],
      }
    ],
    bank_movements: [
      { text: 'Data', value: 'movements_date_formatted' },
      { text: 'Origem', value: 'origin_type_formatted' },
      { text: 'Tipo', value: 'movement_type_formatted' },
      { text: 'Descrição', value: 'description' },
      { text: 'Valor', value: 'value_formatted' },
      { text: 'Ações', value: 'actions', align: 'end' },
    ],
    footer: []
  }