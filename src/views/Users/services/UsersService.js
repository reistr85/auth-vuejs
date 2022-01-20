import DynamicService from '../../../service/DynamicService';
import { type_users } from '@/constants/options';
import { getText } from '@/utils';

const formatResponse = (user) => {
  user.type_formatted = getText(type_users, user.type);
}

const UserService = DynamicService('users', {
  formatResponse,
});

export default UserService ;