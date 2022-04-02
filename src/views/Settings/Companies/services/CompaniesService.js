import axios from 'axios';
import DynamicService from '@/service/DynamicService';
import AuthService from '@/views/Auth/services/AuthService';
import { getText, formatDate, formatPhone } from '@/utils';
import { typeSituation } from '@/utils/options';

const formatResponse = (item) => {
  item.created_at_formatted = formatDate(item.created_at);
  item.cell_phone_formatted = formatPhone(item.cell_phone);
  item.situation_formatted = getText(typeSituation, item.situation);
};

const CompaniesService = DynamicService('companies', {
  formatResponse,
});

const CompaniesCommands = () => ({
  async store(payload) {
    new Promise((resolve, reject) => {
      axios.post('companies', payload).then((res) => {
        AuthService.setLocalStorage(res.data);
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }
});

export default CompaniesService;
export { CompaniesCommands };