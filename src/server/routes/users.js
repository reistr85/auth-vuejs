export default (server) => {
  server.get('/users', (schema) => {
    return schema.users.all();
  });
};
