export default (server) => {
  server.create('allType', {
    name: 'Externo',
    description: 'Agendamento Externo',
    value: 'external',
    situation: 'active',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Fora do Ar',
    description: 'Agendamento Fora do Ar',
    value: 'offAir',
    situation: 'active',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Interno',
    description: 'Agendamento Interno',
    value: 'internal',
    situation: 'active',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  });
  server.create('allType', {
    name: 'Vídeo',
    description: 'Agendamento por Vídeo Conferência',
    value: 'video',
    situation: 'active',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  });
};
