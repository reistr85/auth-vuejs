import { pagination } from '../pagination';

export default (server) => {
  server.get('/users', (schema, request) => {
    const users = schema.users.all();
    const { page, perPage } = request.queryParams;

    return pagination('users', users, page, perPage);
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
  server.delete('/users/:id', (schema, request) => {
    const { id } = request.params;
    const user = schema.users.find(id);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }
    user.destroy();
  });
};
