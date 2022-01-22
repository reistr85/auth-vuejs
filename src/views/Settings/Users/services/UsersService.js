import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item.type_formatted = 'Administrador';
}

const UsersService = DynamicService('users', {
  formatResponse,
});

export default UsersService;