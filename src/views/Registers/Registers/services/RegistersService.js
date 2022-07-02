import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item;
};

const UsersService = DynamicService('registers', {
  formatResponse,
});

export default UsersService;