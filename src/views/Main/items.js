export default [
  {
    active: false,
    menuGroupName: 'home',
    icon: 'home',
    title: 'Início',
    items: [{ icon: 'chart', title: 'Dashboard', route: 'home', active: false }],
  },
  {
    active: false,
    menuGroupName: 'allTypes',
    icon: 'allTypes',
    title: 'Tipos Gerais',
    items: [
      { icon: 'financial', title: 'Forma Pagamento', route: 'paymentMethods', params: { query: { type: 'paymentMethod' } }, active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'registers',
    icon: 'plus',
    title: 'Cadastros',
    items: [
      { icon: 'accountTie', title: 'Cadastros', route: 'registers', active: false },
    ],
  },
];