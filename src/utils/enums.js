const appointmentStatus = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DONE: 'done',
  CANCELED: 'canceled'
});

const orderServiceStatus = Object.freeze({
  PENDING: 'pending',
  FINISHED: 'finished',
});

const typeRegister = Object.freeze({
  CUSTOMER: 'customer',
  EMPLOYEE: 'employee',
  COLLABORATOR: 'collaborator',
  VENDOR: 'finished',
  PROVIDER: 'provider',
  SELLER: 'seller',
  OTHERS: 'others',
});

const typeMovement = Object.freeze({
  INPUT: 'input',
  OUTPUT: 'output',
});

const typePerson = Object.freeze({
  PF: 'F',
  PJ: 'J',
});

const typeAllType = Object.freeze({
  CATEGORY: 'category',
  SUB_CATEGORY: 'sub-category',
  PAYMENT_METHOD: 'payment-method',
  CARD_FLAG: 'card-flag',
});

const accountPaymentStatus = Object.freeze({
  PENDING: 'pending',
  PARTIAL: 'partial',
  SETTLED: 'settled',
});

export {
  appointmentStatus,
  orderServiceStatus,
  typeRegister,
  typeMovement,
  typePerson,
  typeAllType,
  accountPaymentStatus
};
