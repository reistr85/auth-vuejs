import DynamicService from '@/service/DynamicService';
import { formatCurrency, getText } from '@/utils';
import { typeSituation } from '@/utils/options';

const formatResponse = (item) => {
  item.category_formatted = item.category?.description;
  item.sub_category_formatted = item.sub_category?.description;
  item.cost_value_formatted = formatCurrency(item.cost_value);
  item.sale_value_formatted = formatCurrency(item.sale_value);
  item.situation_formatted = getText(typeSituation, item.situation);
}

const ServicesService = DynamicService('services', {
  formatResponse,
});

export default ServicesService;