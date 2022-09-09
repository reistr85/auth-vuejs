import { pagination } from '../../utils/pagination';
import { softDelete } from '../../utils/softDelete';
import { getText } from '@/utils';
import { typeUser } from '@/utils/options';

export const getAll = (server) => {
  server.get('/users', (schema, request) => {
    const users = schema.users.all();
    const { page, perPage } = request.queryParams;

    users.models = softDelete(users);
    users.models = users.models.map((item) => {
      return {
        ...item.attrs,
        type_formatted: getText(typeUser, item.type),
      };
    });

    return pagination('users', users, page, perPage);
  });
};