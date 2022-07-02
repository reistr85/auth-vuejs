import { pagination } from '../pagination';
import { softDelete } from '../softDelete';
import { filter } from '../filter';

export default (server) => {
  server.get('/allTypes', (schema, request) => {
    const allTypes = schema.allTypes.all();
    const { page, perPage } = request.queryParams;

    allTypes.models = filter(request.queryParams, allTypes);
    allTypes.models = softDelete(allTypes);
    return pagination('allTypes', allTypes, page, perPage);
  });
  server.get('/allTypes/:id', (schema, request) => {
    const { id } = request.params;
    return schema.allTypes.find(id);
  });
  server.post('/allTypes', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { name, description } = attrs;

    if ( !name || !description ) {
      return new Response(422, {}, { errors: {
        name: 'The field name is required',
        description: 'The field type is required',
      } });
    }

    const allType = {
      ...attrs,
      situation: 'active',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    const response = schema.allTypes.create(allType);

    return { allType: response.attrs };
  });
  server.put('/allTypes/:id', (schema, request) => {
    const { id } = request.params;
    const allType = schema.allTypes.find(id);

    if (!allType) {
      return new Response(404, {}, { errors: {} });
    }

    const attrs = JSON.parse(request.requestBody);
    const { name, description } = attrs;

    if ( !name || !description ) {
      return new Response(422, {}, { errors: {
        name: 'The field name is required',
        description: 'The field type is required',
      } });
    }

    allType.update({ name, description });
  });
  server.delete('/allTypes/:id', (schema, request) => {
    const { id } = request.params;
    const allType = schema.allTypes.find(id);

    if (!allType) {
      return new Response(404, {}, { errors: {} });
    }
    allType.update({ deleted_at: new Date() });
  });
};
