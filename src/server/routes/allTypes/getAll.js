import { pagination } from '../../utils/pagination';
import { softDelete } from '../../utils/softDelete';
import { filter } from '../../utils/filter';

export const getAll = (server) => {
  server.get('/allTypes', (schema, request) => {
    const allTypes = schema.allTypes.all();
    const { page, perPage } = request.queryParams;

    allTypes.models = filter(request.queryParams, allTypes);
    allTypes.models = softDelete(allTypes);
    return pagination('allTypes', allTypes, page, perPage);
  });
};