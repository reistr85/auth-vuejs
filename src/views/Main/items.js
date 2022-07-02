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
      { icon: 'certificateOutline', title: 'Certificados', route: 'indications', active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'schedules',
    icon: 'alarm',
    title: 'Agendamentos',
    items: [
      { icon: 'calendarEdit', title: 'Tipo de Agendamento', route: 'typeSchedules', params: { query: { type: 'typeSchedule' } }, active: false },
      { icon: 'clockListOutline', title: 'Agendamentos', route: 'schedules', active: false },
    ],
  },
];