import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_NODE_ENV === 'development' ? '/api/v1' : process.env.VUE_APP_URL_API;

axios.interceptors.request.use(
  async config => {
    const token = localStorage.getItem(`${process.env.VUE_APP_NAME}.token`);

    config.headers = {
      'Authorization': `Bearer ${token}`,
      'ApiKey': process.env.VUE_APP_API_KEY,
    };

    return config;
  },
  error => {
    Promise.reject(error);
  });

axios.interceptors.response.use(
  response => {
    return response;
  },
  (error) => {
    if (error.response?.status == 401){
      localStorage.removeItem(`${process.env.VUE_APP_NAME}.token`);
      localStorage.removeItem(`${process.env.VUE_APP_NAME}.user`);

      const url = window.location.href.toString().split('/');

      if (url[url.length - 1] != 'login')
        window.location = `${process.env.VUE_APP_URL}/login`;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axios;