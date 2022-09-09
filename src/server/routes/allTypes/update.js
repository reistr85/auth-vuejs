import { dateTime } from '../../utils/dateTime';
// eslint-disable-next-line no-unused-vars
import { situation } from '@/utils/enums';
import { getText } from '@/utils';
import { typeSituation } from '@/utils/options';

export const update = (server) => {
  server.put('/allTypes/:id', (schema, request) => {
    const { id } = request.params;
    const allType = schema.allTypes.find(id);

    if (!allType) {
      return new Response(404, {}, { errors: {} });
    }

    const attrs = JSON.parse(request.requestBody);
    const { name, description, situation } = attrs;

    if (situation) {
      allType.update({
        situation,
        situation_formatted: getText(typeSituation, situation),
      } );
    }

    if ( !name || !description ) {
      return new Response(422, {}, { errors: {
        name: 'The field name is required',
        description: 'The field type is required',
      }});
    }

    allType.update({ name, description, deleted_at: dateTime });
  });
};