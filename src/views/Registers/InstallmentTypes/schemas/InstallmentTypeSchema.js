import { typePageOptions } from '@/utils';
import { text, list } from '@/utils/icons';
import { required } from '@/utils/rules';
import { typeYesNo } from '@/utils/options';
import InstallmentType from '@/business/InstallmentType';

export default {
    domain: 'installment-types',
    business: InstallmentType,
    title: 'Tipos de Parcelamento',
    description: 'Lista os Tipos de Parcelamento no sistema',
    createBtn: 'Novo Tipo de Parcelamento',
    routes: {
      list: {
        name: 'installmenttypes',
        path: '/parcelamentos',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
      create: {
        name: 'installmenttypes-create',
        path: '/parcelamentos/novo',
        meta: { typePage: typePageOptions.create, requiresAuth: true, }
      },
      show: {
        name: 'installmenttypes-show',
        path: '/parcelamentos/:id',
        meta: { typePage: typePageOptions.show, requiresAuth: true, }
      }
    },
    listActions: {
      has: true,
      noShow: false,
      noDestroy: false,
      situation: true,
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
          name: 'name',
          icon: text,
          md: 6,
        },
      ],
    },
    fields: [
      {
        icon: list,
        title: 'Dados do Tipo de Parcelamento',
        openGroup: true,
        items: [
          {
            type: 'text',
            name: 'description',
            formattedName: 'description',
            label: 'Descrição',
            align: '',
            md: '12',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'text',
            name: 'interval_installments',
            formattedName: 'interval_installments_formatted',
            label: 'Intervalo entre Parcelas',
            align: '',
            md: '6',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
          },
          {
            type: 'select',
            name: 'use_input_value',
            formattedName: 'use_input_value_formatted',
            label: 'Usar Entrada',
            align: '',
            md: '3',
            rules: [required],
            list: true,
            readonly: false,
            disabled: false,
            items: typeYesNo,
            default: 'no',
            itemText: 'text',
            itemValue: 'value'
          },
          {
            type: 'percent',
            name: 'percent_input_value',
            formattedName: 'percent_input_value',
            label: 'Porcentagem Entrada',
            align: '',
            md: '3',
            rules: [],
            list: true,
            readonly: false,
            disabled: false,
            clearable: false,
            uffix: '%',
            length: 4,
            precision: 2,
            empty: null,
          },
          {
            type: 'text',
            name: 'observations',
            formattedName: 'observations',
            label: 'Observações',
            align: '',
            md: '12',
            rules: [],
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