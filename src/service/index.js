import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_URL_API;

axios.interceptors.request.use(
  async config => {
    const access_token = localStorage.getItem(`${process.env.VUE_APP_NAME}.access_token`);

    config.headers = { 
      'Authorization': `Bearer ${access_token}`,
      'ApiKey': process.env.VUE_APP_API_KEY,
    }

    return config;
  },
  error => {
    Promise.reject(error)
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  (error) => {
    if(error.response.status == 401){
      localStorage.removeItem(`${process.env.VUE_APP_NAME}.access_token`);
      localStorage.removeItem(`${process.env.VUE_APP_NAME}.user`);
      localStorage.removeItem(`${process.env.VUE_APP_NAME}.company`);

      const url = window.location.href.toString().split('/')

      if(url[url.length - 1] != 'login')
        window.location = `${process.env.VUE_APP_URL}/login`;
      return Promise.reject(error)
    }

    return Promise.reject(error)
});

export default axios;