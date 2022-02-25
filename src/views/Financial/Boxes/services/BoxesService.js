import axios from 'axios';
import DynamicService from '@/service/DynamicService';
import { formatCurrency, formatDate, getText } from '@/utils';
import { statusBoxes, originTypeBoxMovements } from '@/utils/options';

const formatResponse = (item) => {
  item.box_date_formatted = formatDate(item.box_date);
  item.employee = item.employee.name;
  item.initial_value_formatted = formatCurrency(item.initial_value);
  item.total_value_formatted = formatCurrency(item.total_value);
  item.status_formatted = getText(statusBoxes, item.status);

  item.movements.forEach((i) => {
    i.box_movements_date_formatted = formatDate(i.box_movements_date, true);
    i.total_value_formatted = formatCurrency(i.total_value);
    i.origin_type_formatted = getText(originTypeBoxMovements, i.origin_type);
  });
}

const formatResponseGetAllBoxMovementsByBoxId = (res) => {
  const { data } = res.data;
  data.forEach((item) => {
    item.origin_type_formatted = 'test'
  })

  return res;
}

const BoxesService = DynamicService('boxes', {
  formatResponse,
});

const BoxesCommands = () => ({
  async getAllBoxMovementsByBoxId(id) {
     const res = await axios.get(`boxes/${id}/box-movements`);
     return formatResponseGetAllBoxMovementsByBoxId(res);
  }
})

export default BoxesService;
export { BoxesService, BoxesCommands }