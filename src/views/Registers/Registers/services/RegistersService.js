import DynamicService from '@/service/DynamicService';
import { typeRegister } from '@/utils/options';
import { getText } from '@/utils';

const formatResponse = (item) => {
  item.type_formatted = getText(typeRegister, item.type);
}

const RegistersService = DynamicService('registers', {
  formatResponse,
});

export default RegistersService;