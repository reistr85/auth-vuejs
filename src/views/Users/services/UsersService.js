import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item.type_formatted = 'Administrador';
}

const UserService = DynamicService('users', {
  formatResponse,
});

export default UserService;