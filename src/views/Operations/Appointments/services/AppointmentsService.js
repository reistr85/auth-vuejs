import axios from '@/service';
import DynamicService from '@/service/DynamicService';
import AppointmentSchema from '../schemas/AppointmentSchema';
import { formatDate, getText } from '@/utils';
import { statusAppointment } from '@/utils/options';

const formatResponse = (item) => {
  item.appointment_date_formatted = formatDate(item.appointment_date);
  item.initial_hour_formatted = item.initial_hour.substr(0, 5);
  item.final_hour_formatted = item.final_hour.substr(0, 5);
  item.status_formatted = getText(statusAppointment, item.status);
};

const AppointmentService = DynamicService('appointments',  AppointmentSchema, {
  formatResponse,
});

const AppointmentCommands = () => ({
  async lastAppointmentNumber() {
    return await axios.post('appointments/last-appointment-number');
  }
});

export default AppointmentService;
export { AppointmentService, AppointmentCommands };