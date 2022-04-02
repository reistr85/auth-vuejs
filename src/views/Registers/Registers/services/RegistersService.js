import DynamicService from '@/service/DynamicService';
import RegisterSchema from '../schemas/RegisterSchema';
import { typeRegister, typeSituation } from '@/utils/options';
import { getText, formatPhone, formatCpfCnpj } from '@/utils';

const formatResponse = (item) => {
  item.type_formatted = '';

  item.type.split(', ').forEach((type) => {
    item.type_formatted += getText(typeRegister, type)+' - ';
  });
  item.type_formatted = item.type_formatted.slice(0, -2);

  item.cnpj_formatted = formatCpfCnpj(item.cnpj);
  item.cpf_formatted = formatCpfCnpj(item.cpf);
  item.phone_formatted = formatPhone(item.phone);
  item.cell_phone_formatted = formatPhone(item.cell_phone);
  item.situation_formatted = getText(typeSituation, item.situation);
};

const RegistersService = DynamicService('registers', RegisterSchema, {
  formatResponse,
});

export default RegistersService;