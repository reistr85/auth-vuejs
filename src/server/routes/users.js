export default (server) => {
  server.get('/users', (schema) => {
    return schema.users.all();
  });
  server.get('/users/:id', (schema, request) => {
    const { id } = request.params;
    return schema.users.find(id);
  });
  server.post('/users', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { name, email, password, type } = attrs;

    if ( !name || !email || !password || !type ) {
      return new Response(422, {}, { errors: {
        name: 'The field name is required',
        email: 'The field email is required',
        password: 'The field password is required',
        type: 'The field type is required',
      } });
    }

    const user = {
      ...attrs,
      situation: 'active',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    const response = schema.users.create(user);

    return { user: response.attrs };
  });
};
