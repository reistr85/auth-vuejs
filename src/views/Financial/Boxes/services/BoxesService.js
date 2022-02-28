import DynamicService from '@/service/DynamicService';
import { formatCurrency, formatDate, getText } from '@/utils';
import { statusBoxes } from '@/utils/options';

const formatResponse = (item) => {
  item.box_date_formatted = formatDate(item.box_date);
  item.initial_value_formatted = formatCurrency(item.initial_value);
  item.total_value_formatted = formatCurrency(item.total_value);
  item.status_formatted = getText(statusBoxes, item.status);

  item.movements.forEach((i) => {
    i.box_movements_date_formatted = formatDate(i.box_movements_date);
    i.total_value_formatted = formatCurrency(i.total_value);
  });
}

const BoxesService = DynamicService('boxes', {
  formatResponse,
});

export default BoxesService; 