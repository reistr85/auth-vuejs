import DynamicService from '@/service/DynamicService';
import { typeRegister } from '@/utils/options';
import { getText, formatPhone, formatCpfCnpj } from '@/utils';

const formatResponse = (item) => {
  item.type_formatted = getText(typeRegister, item.type);
  item.cnpj_formatted = formatCpfCnpj(item.cnpj);
  item.cpf_formatted = formatCpfCnpj(item.cpf);
  item.telephone_formatted = formatPhone(item.telephone);
}

const RegistersService = DynamicService('registers', {
  formatResponse,
});

export default RegistersService;