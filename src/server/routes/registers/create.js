import { baseFields } from '../../utils/baseFields';

export const create = (server) => {
  server.post('/registers', (schema, { requestBody }) => {
    const attrs = JSON.parse(requestBody);
    const { type, name, email, cell_phone } = attrs;

    if ( !type, !name || !email || !cell_phone ) {
      return new Response(422, {}, { errors: {
        type: 'The field type is required',
        name: 'The field name is required',
        email: 'The field email is required',
        cell_phone: 'The field cell_phone is required',
      } });
    }

    const register = {
      ...attrs,
      cell_phone_formatted: cell_phone,
      ...baseFields,
    };

    const response = schema.registers.create(register);
    return { user: response.attrs };
  });
};