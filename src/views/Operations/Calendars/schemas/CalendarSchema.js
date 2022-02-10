import { typePageOptions } from '@/utils';

export default {
    domain: 'calendars',
    title: 'Meu Calendário',
    description: '',
    createBtn: '',
    formAddress: false,
    showExpand: false,
    routes: {
      list: {
        name: 'calendars',
        path: '/calendarios',
        meta: { typePage: typePageOptions.list, requiresAuth: true, }
      },
    },
    listActions: {
      has: false,
      noShow: true,
      noDestroy: true,
      situation: false,
      more: {
        has: false,
        items: []
      },
    },
    filters: {
      has: false,
      relations: '',
      items: []
    },
    fields: [],
    footer: []
  }