import { pagination } from '../pagination';
import { softDelete } from '../softDelete';
import { getText, formatPhone } from '@/utils';
import { typeRegister } from '@/utils/options';
import { baseFields } from '../baseFields';
import { dateTime } from '../dateTime';
import { find } from '../find';

export default (server) => {
  server.get('/registers', (schema, request) => {
    const registers = schema.registers.all();
    const { page, perPage } = request.queryParams;

    registers.models = softDelete(registers);
    registers.models = registers.models.map((item) => {
      return {
        ...item.attrs,
        type_formatted: getText(typeRegister, item.type),
        cell_phone_formatted: formatPhone(item.cell_phone),
      };
    });

    return pagination('registers', registers, page, perPage);
  });
  server.get('/registers/:id', (schema, { params }) => {
    return find(params.id, schema);
  });
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
  server.delete('/registers/:id', (schema, { params }) => {
    const user = find(params.id, schema);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }
    user.update({ updated_at: dateTime, deleted_at: dateTime });
  });
};