import { dateTime } from '../../utils/dateTime';

export const destroy = (server) => {
  server.delete('/registers/:id', (schema, { params }) => {
    const user = find(params.id, schema);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }
    user.update({ updated_at: dateTime, deleted_at: dateTime });
  });
};