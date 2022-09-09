import { baseFields } from '../../utils/baseFields';

export const create = (server) => {
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
      ...baseFields
    };

    const response = schema.users.create(user);

    return { user: response.attrs };
  });
};