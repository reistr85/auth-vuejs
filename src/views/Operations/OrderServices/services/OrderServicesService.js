import DynamicService from '@/service/DynamicService';
import { formatCurrency, formatDate, getText } from '@/utils';
import { statusOrderService } from '@/utils/options';

const formatResponse = (item) => {
  item.order_date_formatted = formatDate(item.order_date);
  item.subtotal_formatted = formatCurrency(item.subtotal);
  item.discount_formatted = formatCurrency(item.discount);
  item.amount_formatted = formatCurrency(item.amount);
  item.status_formatted = getText(statusOrderService, item.status);

  item.items.forEach((i) => {
    i.subtotal_formatted = formatCurrency(i.subtotal);
    i.discount_formatted = formatCurrency(i.discount);
    i.amount_formatted = formatCurrency(i.amount);
  });

  item.payments.forEach((i) => {
    i.payment_date_formatted = formatDate(i.payment_date);
    i.amount_paid_formatted = formatCurrency(i.amount_paid);
  });
}

const OrdderServiceService = DynamicService('order-services', {
  formatResponse,
});

export default OrdderServiceService;