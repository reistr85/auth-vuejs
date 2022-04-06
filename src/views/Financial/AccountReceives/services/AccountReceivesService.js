import axios from 'axios';
import DynamicService from '@/service/DynamicService';
import AccountReceiveSchema from '../schemas/AccountReceiveSchema';
import { formatCurrency, formatDate, getText } from '@/utils';
import { typeStatusAccountReceives, typeStatusAccountReceiveInstallments } from '@/utils/options';

const formatResponse = (item) => {
  item.register_formatted = item.register.name;
  item.date_issuance_formatted = formatDate(item.date_issuance);
  item.date_competency_formatted = formatDate(item.date_competency);
  item.date_discharge_formatted = formatDate(item.date_discharge);
  item.amount_receive_formatted = formatCurrency(item.amount_receive);
  item.amount_formatted = formatCurrency(item.amount);
  item.status_formatted = getText(typeStatusAccountReceives, item.status);
};

const formatResponseGetAllAccountReceiveInstallmentsByAccountReceiveId = (res) => {
  const { data } = res;
  data.forEach((item) => {
    item.date_due_formatted = formatDate(item.date_due);
    item.date_receive_formatted = formatDate(item.date_receive);
    item.bank_formatted = item.bank?.description;
    item.payment_method_formatted = item.payment_method?.description,
    item.amount_formatted = formatCurrency(item.amount);
    item.status_formatted = getText(typeStatusAccountReceiveInstallments, item.status);
  });
  return res;
};

const AccountReceivesService = DynamicService('account-receives', AccountReceiveSchema, {
  formatResponse,
});

const AccountReceivesCommands = () => ({
  async getAllAccountReceiveInstallmentsByAccountReceiveId(id, payload) {
    const res = await axios.get(`account-receives/${id}/account-receives-installments?page=${payload.page}`);
    return formatResponseGetAllAccountReceiveInstallmentsByAccountReceiveId(res);
  }
});

export default AccountReceivesService;
export { AccountReceivesService, AccountReceivesCommands };