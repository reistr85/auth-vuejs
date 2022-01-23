import axios from 'axios';
import DynamicService from '@/service/DynamicService';
import AuthService from '@/views/Auth/services/AuthService';

const formatResponse = (item) => {
  item
}

const CompaniesService = DynamicService('companies', {
  formatResponse,
});

const CompaniesCommands = () => ({
  async store(payload) {
    new Promise((resolve, reject) => {
      axios.post('companies', payload).then((res) => {
        AuthService.setLocalStorage(res.data)
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }
})

export default CompaniesService;
export { CompaniesCommands }