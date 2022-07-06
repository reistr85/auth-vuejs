import { dateTime } from '../dateTime';

export default (server) => {
  server.create('allType', {
    name: 'Dinheiro',
    description: 'Pagamento em Dinheiro',
    type: 'paymentMethod',
    value: null,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Cartão de Crédito',
    description: 'Pagamento com Cartão de Crédito',
    type: 'paymentMethod',
    value: null,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'PIX',
    description: 'Pagamento em PIX',
    type: 'paymentMethod',
    value: null,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Externo',
    description: 'Agendamento Externo',
    type: 'typeSchedule',
    value: 'external',
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Fora do Ar',
    description: 'Agendamento Fora do Ar',
    type: 'typeSchedule',
    value: 'offAir',
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Interno',
    description: 'Agendamento Interno',
    type: 'typeSchedule',
    value: 'internal',
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Vídeo',
    description: 'Agendamento por Vídeo Conferência',
    type: 'typeSchedule',
    value: 'video',
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'e-CPF A1',
    description: 'Certificado para pessoa física A1',
    type: 'certificateType',
    value: null,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: 'e-CPF A3',
    description: 'Certificado para pessoa física A3',
    type: 'certificateType',
    value: null,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: '1 Ano',
    description: 'Perídoro de 1 Ano',
    type: 'certificatePeriod',
    value: null,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
  server.create('allType', {
    name: '2 Ano',
    description: 'Perídoro de 2 Ano',
    type: 'certificatePeriod',
    value: null,
    situation: 'active',
    created_at: dateTime,
    updated_at: dateTime,
    deleted_at: null,
  });
};
