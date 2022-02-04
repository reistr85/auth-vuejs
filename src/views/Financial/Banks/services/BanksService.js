import DynamicService from '@/service/DynamicService';
import { typeAccount, typeBankNumber } from '@/utils/options';
import { getText } from '@/utils';

const formatResponse = (item) => {
  item.account_type_formatted = getText(typeAccount, item.typeAccount);
  item.bank_number_formatted = getText(typeBankNumber, item.bank_number);
}

const RegistersService = DynamicService('banks', {
  formatResponse,
});

export default RegistersService;