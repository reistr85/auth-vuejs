import { Response } from 'miragejs';

export default (server) => {
  server.post('/auth/login', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const response = schema.users.findBy({ email: attrs.email, password: attrs.password });

    if (!response) {
      return new Response(401, {}, { errors: { message: 'unauthorized' } });
    }

    return new Response(200, {}, { user: response.attrs, token: process.env.VUE_APP_TOKEN_JWT });
  });
  server.post('/auth/register', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { name, email, password, cell_phone } = attrs;

    if ( !name || !email || !password || !cell_phone ) {
      return new Response(422, {}, { errors: {
        name: 'The field name is required',
        email: 'The field email is required',
        password: 'The field password is required',
        cell_phone: 'The field cell_phone is required',
      } });
    }

    const response = schema.users.create(attrs);

    return { user: response.attrs };
  });
};
