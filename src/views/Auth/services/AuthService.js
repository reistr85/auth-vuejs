import axios from '@/service';

const AuthService = {
  login(payload) {
    return new Promise((resolve, reject) => {
      axios.post('auth/login', payload).then((res) => {
        this.setLocalStorage(res.data);
        resolve(res);
      }).catch((err) => {
        this.clearLocalStorage();
        reject(err);
      });
    });
  },
  logout() {
    return new Promise((resolve) => {
      this.clearLocalStorage();
      resolve(true);
    });
  },
  setLocalStorage(data) {
    const { token, user } = data;
    localStorage.setItem(`${process.env.VUE_APP_NAME}.token`, token);
    localStorage.setItem(`${process.env.VUE_APP_NAME}.user`, JSON.stringify(user));
  },
  clearLocalStorage() {
    localStorage.removeItem(`${process.env.VUE_APP_NAME}.token`);
    localStorage.removeItem(`${process.env.VUE_APP_NAME}.user`);
  }
};

export default AuthService;