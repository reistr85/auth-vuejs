import { dateTime } from '../dateTime';

export default (server) => {
  server.create('certificate', {
    certificate_type_formatted: 'e-CPF',
    certificate_period_formatted: '1 Ano',
    name: 'Renovação',
    description: 'Certificado para Renovação',
    price: 199,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('certificate', {
    certificate_type_formatted: 'e-CPF',
    certificate_period_formatted: '2 Ano',
    name: 'Renovação',
    description: 'Certificado para Renovação',
    price: 199,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
};
