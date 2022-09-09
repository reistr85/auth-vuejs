import { dateTime } from '../../utils/dateTime';

export const destroy = (server) => {
  server.delete('/users/:id', (schema, request) => {
    const { id } = request.params;
    const user = schema.users.find(id);

    if (!user) {
      return new Response(404, {}, { errors: {} });
    }
    user.update({ updated_at: dateTime, deleted_at: dateTime });
  });
};