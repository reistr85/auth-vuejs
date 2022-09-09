import { baseFields } from '../../utils/baseFields';

export const create = (server) => {
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
      ...baseFields,
    };

    const response = schema.allTypes.create(allType);

    return { allType: response.attrs };
  });
};