import axios from 'axios';
import DynamicService from '@/service/DynamicService';
import BoxSchema from '../schemas/BoxSchema';
import { formatCurrency, formatDate, getText } from '@/utils';
import { statusBoxes, originTypeBoxMovements } from '@/utils/options';

const formatResponse = (item) => {
  item.box_date_formatted = formatDate(item.box_date);
  item.employee = item.employee.name;
  item.initial_value_formatted = formatCurrency(item.initial_value);
  item.total_value_formatted = formatCurrency(item.total_value);
  item.status_formatted = getText(statusBoxes, item.status);
}

const formatResponseGetAllBoxMovementsByBoxId = (res) => {
  const { data } = res.data;
  data.forEach((item) => {
    item.box_movements_date_formatted = formatDate(item.box_movements_date, true);
    item.total_value_formatted = formatCurrency(item.total_value);
    item.origin_type_formatted = getText(originTypeBoxMovements, item.origin_type);
  })

  return res;
}

const BoxesService = DynamicService('boxes', BoxSchema, {
  formatResponse,
});

const BoxesCommands = () => ({
  async getAllBoxMovementsByBoxId(id, payload) {
     const res = await axios.get(`boxes/${id}/box-movements?page=${payload.page}`);
     return formatResponseGetAllBoxMovementsByBoxId(res);
  }
})

export default BoxesService;
export { BoxesService, BoxesCommands }