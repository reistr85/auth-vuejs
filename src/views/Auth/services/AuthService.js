import axios from '@/service'

const AuthService = {
  login(payload) {
    return new Promise((resolve, reject) => {
      axios.post('auth/login', payload).then((res) => {
        const { access_token, user } = res.data;

        localStorage.setItem(`${process.env.VUE_APP_NAME}.access_token`, access_token);
        localStorage.setItem(`${process.env.VUE_APP_NAME}.user`, JSON.stringify(user));
        localStorage.setItem(`${process.env.VUE_APP_NAME}.company`, JSON.stringify(user.company));

        resolve(res)
      }).catch((err) => {
        this.clearLocalStorage();
        reject(err);
      });
    })
  },
  logout() {
    return new Promise((resolve) => {
      this.clearLocalStorage();
      resolve(true)
    })
  },
  clearLocalStorage() {
    localStorage.removeItem(`${process.env.VUE_APP_NAME}.access_token`)
    localStorage.removeItem(`${process.env.VUE_APP_NAME}.user`)
    localStorage.removeItem(`${process.env.VUE_APP_NAME}.company`)
  }
}

export default AuthService;