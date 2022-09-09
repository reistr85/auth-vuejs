export const show = (server) => {
  server.get('/registers/:id', (schema, { params }) => {
    return find(params.id, schema);
  });
};