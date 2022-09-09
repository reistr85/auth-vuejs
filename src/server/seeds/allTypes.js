import { baseFields } from '../utils//baseFields';

export default (server) => {
  server.create('allType', {
    name: 'Dinheiro',
    description: 'Pagamento em Dinheiro',
    type: 'paymentMethod',
    value: null,
    ...baseFields,
  });
  server.create('allType', {
    name: 'Cartão de Crédito',
    description: 'Pagamento com Cartão de Crédito',
    type: 'paymentMethod',
    value: null,
    ...baseFields,
    situation: 'inactive',
    situation_formatted: 'Inativo',
  });
  server.create('allType', {
    name: 'PIX',
    description: 'Pagamento em PIX',
    type: 'paymentMethod',
    value: null,
    ...baseFields,
  });
};
