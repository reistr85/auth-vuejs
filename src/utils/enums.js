const appointmentStatus = {
  PENDING: 'pending',
  DONE: 'done',
  CANCELED: 'canceled'
};

const orderServiceStatus = {
  PENDING: 'pending',
  FINISHED: 'finished',
};

const typeRegisters = {
  CUSTOMER: 'customer',
  EMPLOYEE: 'employee',
  COLLABORATOR: 'collaborator',
  VENDOR: 'finished',
  PROVIDER: 'provider',
  SELLER: 'seller',
  OTHERS: 'others',
};

const typeMovement = {
  INPUT: 'input',
  OUTPUT: 'output',
};

const typePerson = {
  PF: 'F',
  PJ: 'J',
};

const typeAllType = Object.freeze({
  categorias: 'category',
  'sub-categorias': 'sub-category',
  pagamentos: 'payment-method',
  bandeiras: 'card-flags',
});

const accountPaymentStatus = {
  PENDING: 'pending',
  PARTIAL: 'partial',
  SETTLED: 'settled',
};

export {
  appointmentStatus,
  orderServiceStatus,
  typeRegisters,
  typeMovement,
  typePerson,
  typeAllType,
  accountPaymentStatus
};
