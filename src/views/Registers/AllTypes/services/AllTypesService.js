import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item.type_formatted = 'Administrador';
}

const AllTypesService = DynamicService('all-types', {
  formatResponse,
});

export default AllTypesService;