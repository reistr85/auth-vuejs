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
      { icon: 'calendarEdit', title: 'Tipo de Agendamento', route: 'typeSchedules', active: false },
      { icon: 'financial', title: 'Forma Pagamento', route: 'paymentMethods', active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'registers',
    icon: 'plus',
    title: 'Cadastros',
    items: [
      { icon: 'accountSwitch', title: 'Indicações', route: 'indications', active: false },
      { icon: 'accountTie', title: 'Clientes', route: 'indications', active: false },
      { icon: 'certificateOutline', title: 'Certificados', route: 'indications', active: false },
      { icon: 'agent', title: 'Agentes', route: 'indications', active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'schedules',
    icon: 'alarm',
    title: 'Agendamentos',
    items: [{ icon: 'clockListOutline', title: 'Agendamentos', route: 'schedules', active: false }],
  },
];