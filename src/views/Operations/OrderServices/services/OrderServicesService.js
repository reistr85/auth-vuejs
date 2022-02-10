import DynamicService from '@/service/DynamicService';
import { formatCurrency, formatDate, getText } from '@/utils';
import { statusOrderService } from '@/utils/options';

const formatResponse = (item) => {
  item.order_date_formatted = formatDate(item.order_date);
  item.subtotal_formatted = formatCurrency(item.subtotal);
  item.discount_formatted = formatCurrency(item.discount);
  item.amount_formatted = formatCurrency(item.amount);
  item.status_formatted = getText(statusOrderService, item.status);
}

const OrdderServiceService = DynamicService('order-services', {
  formatResponse,
});

export default OrdderServiceService;