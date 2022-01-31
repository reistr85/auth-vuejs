import DynamicService from '@/service/DynamicService';
import { typeRegister } from '@/utils/options';
import { getText, formatPhone, formatCpfCnpj } from '@/utils';

const formatResponse = (item) => {
  item.type_formatted = '';

  item.type.split(', ').forEach((type) => {
    item.type_formatted += getText(typeRegister, type)+' - ';
  })
  item.type_formatted = item.type_formatted.slice(0, -2);
  
  item.cnpj_formatted = formatCpfCnpj(item.cnpj);
  item.cpf_formatted = formatCpfCnpj(item.cpf);
  item.telephone_formatted = formatPhone(item.telephone);
}

const RegistersService = DynamicService('registers', {
  formatResponse,
});

export default RegistersService;