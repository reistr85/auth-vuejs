import DynamicService from '@/service/DynamicService';
import { typeUser } from '@/utils/options';
import { getText } from '@/utils';

const formatResponse = (item) => {
  item.type_formatted = getText(typeUser, item.type);
};

const UsersService = DynamicService('users', {
  formatResponse,
});

export default UsersService;