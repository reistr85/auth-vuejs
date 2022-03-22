import axios from 'axios';
import DynamicService from '@/service/DynamicService';
import AccountPaymentSchema from '../schemas/AccountPaymentSchema';
import { formatCurrency, formatDate, getText } from '@/utils';
import { typeStatusAccountPayments } from '@/utils/options';

const formatResponse = (item) => {
  item.register_formatted = item.register.name;
  item.date_issuance_formatted = formatDate(item.date_issuance);
  item.date_competency_formatted = formatDate(item.date_competency);
  item.date_discharge_formatted = formatDate(item.date_discharge);
  item.amount_payment_formatted = formatCurrency(item.amount_payment);
  item.amount_formatted = formatCurrency(item.amount);
  item.status_formatted = getText(typeStatusAccountPayments, item.status);
};

const formatResponseGetAllAccountPaymentInstallmentsByAccountPaymentId = (res) => {
  const { data } = res.data;
  data.forEach((item) => {
    item.date_due_formatted = formatDate(item.date_due, true);
    item.date_payment_formatted = formatCurrency(item.date_payment);
    item.bank_formatted = item.bank.name;
    item.amount_formatted = formatCurrency(item.amount);
  });

  return res;
};

const AccountPaymentsService = DynamicService('account-payments', AccountPaymentSchema, {
  formatResponse,
});

const AccountPaymentsCommands = () => ({
  async getAllAccountPaymentInstallmentsByAccountPaymentId(id, payload) {
     const res = await axios.get(`account-payments/${id}/account-payment_installments?page=${payload.page}`);
     return formatResponseGetAllAccountPaymentInstallmentsByAccountPaymentId(res);
  }
});

export default AccountPaymentsService;
export { AccountPaymentsService, AccountPaymentsCommands };