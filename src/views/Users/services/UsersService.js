import DynamicService from '@/service/DynamicService';

const formatResponse = (user) => {
  user
}

const UserService = DynamicService('users', {
  formatResponse,
});

export default UserService;