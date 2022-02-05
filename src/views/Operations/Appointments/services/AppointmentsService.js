import DynamicService from '@/service/DynamicService';
import { formatDate } from '@/utils';

const formatResponse = (item) => {
  item.date_initial_formatted = formatDate(item.date_initial, true)
  item.date_final_formatted = formatDate(item.date_final, true)
}

const AppointmentService = DynamicService('appointments', {
  formatResponse,
});

export default AppointmentService;