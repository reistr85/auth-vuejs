import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item.type_formatted = 'Administrador';
}

const RegistersService = DynamicService('registers', {
  formatResponse,
});

export default RegistersService;