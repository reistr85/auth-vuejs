import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item;
};

const UsersService = DynamicService('certificates', {
  formatResponse,
});

export default UsersService;