import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item.type_formatted = 'Administrador';
}

const ServicesService = DynamicService('services', {
  formatResponse,
});

export default ServicesService;