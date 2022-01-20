export default {
    domain: 'users',
    title: 'Usuários',
    description: 'Lista de todos os usuários cadastrados no sistema',
    createBtn: 'Novo Usuário',
    routes: {
      list: {
        name: 'users',
        path: '/usuarios',
      },
      create: {
        name: 'user-create',
        path: '/usuarios/novo',
      },
      show: {
        name: 'user-show',
        path: '/usuarios/:id',
      }
    },
    fields: [
      {
        type: 'text',
        name: 'name',
        formattedName: 'name',
        label: 'Nome',
        align: '',
        md: '3',
        required: true,
        list: true,
      },
    ]
  }