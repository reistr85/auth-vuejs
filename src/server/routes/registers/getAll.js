import { pagination } from '../../utils/pagination';
import { softDelete } from '../../utils/softDelete';
import { getText, formatPhone } from '@/utils';
import { typeRegister } from '@/utils/options';

export const getAll = (server) => {
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
};