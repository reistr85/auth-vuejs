import { Response } from 'miragejs';

export default (server) => {
  server.post('/auth/login', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const response = schema.users.findBy({ email: attrs.email, password: attrs.password });

    if (!response) {
      return new Response(401, {}, { errors: { message: 'unauthorized' } });
    }

    return { user: response.attrs, token: process.env.VUE_APP_TOKEN_JWT };
  });
};
