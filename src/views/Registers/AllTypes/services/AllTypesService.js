import DynamicService from '@/service/DynamicService';
import { getText } from '@/utils';
import { typeAllTypes, typeYesNo, typeSituation } from '@/utils/options';

const formatResponse = (item) => {
  item.type_formatted = getText(typeAllTypes, item.type);
  item.use_nickname_formatted = getText(typeYesNo, item.use_nickname);
  item.situation_formatted = getText(typeSituation, item.situation);
}

const AllTypesService = DynamicService('all-types', {
  formatResponse,
});

export default AllTypesService;