import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item
}

const AppointmentService = DynamicService('appointments', {
  formatResponse,
});

export default AppointmentService;