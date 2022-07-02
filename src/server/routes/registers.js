import { pagination } from '../pagination';
import { softDelete } from '../softDelete';
import { getText, formatPhone } from '@/utils';
import { typeRegister } from '@/utils/options';

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
  server.get('/registers/:id', (schema, request) => {
    const { id } = request.params;
    return schema.registers.find(id);
  });
  server.post('/registers', (schema, request) => {
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

    const register = {
      ...attrs,
      situation: 'active',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    const response = schema.registers.create(register);

    return { user: response.attrs };
  });
  server.put('/registers/:id', (schema, request) => {
    const { id } = request.params;
    const user = schema.registers.find(id);

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


    user.update({ name, email, password, type });
  });
  server.delete('/registers/:id', (schema, request) => {
    const { id } = request.params;
    const user = schema.registers.find(id);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }
    user.update({ deleted_at: new Date() });
  });
};
