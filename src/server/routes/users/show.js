export const show = (server) => {
  server.get('/users/:id', (schema, request) => {
    const { id } = request.params;
    return schema.users.find(id);
  });
};