/* eslint-disable */
import axios from './';
import { messageErrors } from '@/utils';

const DynamicService = (endpoint, options = {}) => ({
  get options() {
    return options;
  },
  mountMessageErrors(err) {
    let message = '';

    if(err.status === 422){
      Object.keys(err.data.errors).forEach(function(key) {
        message += `<li class="item-error">${err.data.errors[key][0]}</li>`;
      });
    }else{
      message += `<li class="item-error">Erro desconhecido, tente novamente.</li>`;
    }
    
    return message;
  },
  async index(params = null){
    let items = {}
    let page = 1;
    let totalItemsPerPage = 10;
    let url = '';

    if(params){
      page = params.page;
      totalItemsPerPage = params.totalItemsPerPage;
      url = `${endpoint}?page=${page}&per_page=${totalItemsPerPage}`;
    }

    if(!params)
      url = `${endpoint}`;

    await axios.get(url).then((res) => {
      if (options.formatResponse && typeof options.formatResponse === 'function') {
        res.data.data.forEach((item) => {
          options.formatResponse(item);
        });
      }

      items = res;
    }).catch((err) => {
      console.error(`DynamicService Index error: ${err}`)
    });

    return items;
  },
  async show(id){
    return new Promise((resolve, reject) => {
      let item = {};
      axios.get(`${endpoint}/${id}`).then((res) => {
        item = res.data;
        if (options.formatResponse && typeof options.formatResponse === 'function') {
          options.formatResponse(item);
        }
        resolve(item);
      }).catch((err) => {
        reject(messageErrors(err.response));
      });
    })
  },
  async create(params){
    return new Promise((resolve, reject) => {
      if (options.formatRequest && typeof options.formatRequest === 'function') {
        options.formatRequest(params);
      }
      axios.post(`${endpoint}`, params).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(messageErrors(err.response));
      });
    })
  },
  async update(id, params){
    return new Promise((resolve, reject) => {
      if (options.formatRequest && typeof options.formatRequest === 'function') {
        options.formatRequest(params);
      }

      axios.put(`${endpoint}/${id}`, params).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(messageErrors(err.response));
      });
    })
  },
  async createOrUpdateFile(id, params, type = 'post'){
    return new Promise((resolve, reject) => {
      let payload = new FormData();
      payload.append('file', true);

      Object.keys(params).forEach((key) => {
        payload.append(String(key), params[key]);
      });

      const method_put = type === 'put' ? '?_method=PUT' : '';
      const url = `${endpoint}/${id}${method_put}`;
      
      axios.post(url, payload).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(messageErrors(err.response));
      });
    })
  },
  async delete(id){
    return new Promise((resolve, reject) => {
      axios.delete(`${endpoint}/${id}`).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(messageErrors(err.response));
      });
    })
  },
  async filters(params = null, searches){
    let items = {}
    let page = 1;
    let totalItemsPerPage = 10;
    let url = '';
    let paramsFilter = '';
    let queryParams = '';

    searches.forEach((item) => {
      paramsFilter += `&filter[${item.name}]=${item.value}`
    })

    queryParams = `filters?domain=${endpoint}${paramsFilter}`;

    if(params){
      page = params.page;
      totalItemsPerPage = params.totalItemsPerPage;
      url = `${queryParams}&page=${page}&per_page=${totalItemsPerPage}`;
    }

    if(!params)
      url = `${queryParams}`;

    await axios.get(url).then((res) => {
      if (options.formatResponse && typeof options.formatResponse === 'function') {
        res.data.data.forEach((item) => {
          options.formatResponse(item);
        });
      }

      items = res;
    }).catch((err) => {
      console.error(`DynamicService Index error: ${err}`)
    });

    return items;
  },
});

export default DynamicService;