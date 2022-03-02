import axios from 'axios';
import DynamicService from '@/service/DynamicService';
import BankSchema from '../schemas/BankSchema';
import { formatCurrency, formatDate, getText } from '@/utils';
import { typeAccount, typeBankNumber, typeSituation } from '@/utils/options';
import { originTypeBankMovements, typeBankMovements } from '@/utils/options';

const formatResponse = (item) => {
  item.account_type_formatted = getText(typeAccount, item.account_type);
  item.bank_number_formatted = getText(typeBankNumber, item.bank_number);
  item.situation_formatted = getText(typeSituation, item.situation);
}

const formatResponseGetAllBankMovementsByBankId = (res) => {
  const { data } = res.data;
  data.forEach((item) => {
    item.movements_date_formatted = formatDate(item.movement_date, true);
    item.value_formatted = formatCurrency(item.value);
    item.origin_type_formatted = getText(originTypeBankMovements, item.origin_type);
    item.movement_type_formatted = getText(typeBankMovements, item.movement_type);
  })

  return res;
}

const RegistersService = DynamicService('banks', BankSchema, {
  formatResponse,
});

const BanksCommands = () => ({
  async getAllBankMovementsByBankId(id, payload) {
     const res = await axios.get(`banks/${id}/bank-movements?page=${payload.page}`);
     return formatResponseGetAllBankMovementsByBankId(res);
  }
})

export default RegistersService;
export { RegistersService, BanksCommands }