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
      { icon: 'certificate', title: 'Tipos de Certificado', route: 'certificateTypes', active: false },
      { icon: 'clockListOutline', title: 'Períodos do Certificado', route: 'certificatePeriods', active: false },
      { icon: 'financial', title: 'Forma Pagamento', route: 'paymentMethods', params: { query: { type: 'paymentMethod' } }, active: false },
      { icon: 'calendarEdit', title: 'Tipo de Agendamento', route: 'typeSchedules', params: { query: { type: 'typeSchedule' } }, active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'registers',
    icon: 'plus',
    title: 'Cadastros',
    items: [
      { icon: 'accountTie', title: 'Cadastros', route: 'registers', active: false },
      { icon: 'certificateOutline', title: 'Certificados', route: 'certificates', active: false },
    ],
  },
  {
    active: false,
    menuGroupName: 'schedules',
    icon: 'alarm',
    title: 'Agendamentos',
    items: [
      { icon: 'clockListOutline', title: 'Agendamentos', route: 'schedules', active: false },
    ],
  },
];