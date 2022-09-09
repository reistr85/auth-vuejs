import { dateTime } from '../../utils/dateTime';

export const destroy = (server) => {
  server.delete('/allTypes/:id', (schema, request) => {
    const { id } = request.params;
    const allType = schema.allTypes.find(id);

    if (!allType) {
      return new Response(404, {}, { errors: {} });
    }
    allType.update({ updated_at: dateTime, deleted_at: dateTime });
  });
};