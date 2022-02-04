import DynamicService from '@/service/DynamicService';
import { typeAccount, typeBankNumber, typeSituation } from '@/utils/options';
import { getText } from '@/utils';

const formatResponse = (item) => {
  item.account_type_formatted = getText(typeAccount, item.account_type);
  item.bank_number_formatted = getText(typeBankNumber, item.bank_number);
  item.situation_formatted = getText(typeSituation, item.situation);
}

const RegistersService = DynamicService('banks', {
  formatResponse,
});

export default RegistersService;