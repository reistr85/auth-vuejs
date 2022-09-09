export const show = (server) => {
  server.get('/allTypes/:id', (schema, request) => {
    const { id } = request.params;
    return schema.allTypes.find(id);
  });
};