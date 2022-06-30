import { pagination } from '../pagination';
import { softDelete } from '../softDelete';
import { getText } from '@/utils';
import { typeUser } from '@/utils/options';

export default (server) => {
  server.get('/users', (schema, request) => {
    const users = schema.users.all();
    const { page, perPage } = request.queryParams;

    users.models = softDelete('users', users);
    users.models = users.models.map((item) => {
      return {
        ...item.attrs,
        type_formatted: getText(typeUser, item.type),
      };
    });
    // console.log(users.models);
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


    user.update({ name, email, password, type });
  });
  server.delete('/users/:id', (schema, request) => {
    const { id } = request.params;
    const user = schema.users.find(id);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }
    user.update({ deleted_at: new Date() });
  });
};
