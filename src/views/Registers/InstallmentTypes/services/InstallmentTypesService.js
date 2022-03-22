import DynamicService from '@/service/DynamicService';
import InstallmentTypeSchema from '../schemas/InstallmentTypeSchema';
import { getText } from '@/utils';
import { typeYesNo, typeSituation } from '@/utils/options';

const formatResponse = (item) => {
  item.use_input_value_formatted = getText(typeYesNo, item.use_input_value);
  item.situation_formatted = getText(typeSituation, item.situation);
  item.interval_installments_formatted = JSON.parse(item.interval_installments).join(',');
  item.interval_installments = JSON.parse(item.interval_installments).join(',');
};

const formatRequest = (form) => {
  form.interval_installments = form.interval_installments?.split(','); 
};

const InstallmentTypesService = DynamicService('installment-types', InstallmentTypeSchema, {
  formatResponse,
  formatRequest
});

export default InstallmentTypesService;