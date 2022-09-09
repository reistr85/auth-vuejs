import { dateTime } from '../../utils/dateTime';

export const update = (server) => {
  server.put('/users/:id', (schema, request) => {
    const { id } = request.params;
    const user = schema.users.find(id);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }

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


    user.update({ name, email, password, type, updated_at: dateTime });
  });
};