import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item;
};

const UsersService = DynamicService('allTypes', {
  formatResponse,
});

export default UsersService;