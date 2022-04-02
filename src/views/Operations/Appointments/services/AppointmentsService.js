import DynamicService from '@/service/DynamicService';
import { formatDate, getText } from '@/utils';
import { statusAppointment } from '@/utils/options';

const formatResponse = (item) => {
  item.appointment_date_formatted = formatDate(item.appointment_date);
  item.initial_hour_formatted = item.initial_hour.substr(0, 5);
  item.final_hour_formatted = item.final_hour.substr(0, 5);
  item.status_formatted = getText(statusAppointment, item.status);
};

const AppointmentService = DynamicService('appointments', {
  formatResponse,
});

export default AppointmentService;