import { dateTime } from '../../utils/dateTime';

export const update = (server) => {
  server.put('/registers/:id', (schema, { params, requestBody }) => {
    const user = find(params.id, schema);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }

    const attrs = JSON.parse(requestBody);
    const { type, name, email, cell_phone } = attrs;

    if ( !type || !name || !email || !cell_phone ) {
      return new Response(422, {}, { errors: {
        type: 'The field type is required',
        name: 'The field name is required',
        email: 'The field email is required',
        cell_phone: 'The field cell_phone is required',
      } });
    }

    user.update({ type, name, email, cell_phone, updated_at: dateTime });
  });
};