import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes,
});

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem(`${process.env.VUE_APP_NAME}.access_token`);

  if (to.name === 'login'){
    if (access_token){
      next({name: 'home'});
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!access_token){
      next({name: 'login'});
    }
  }

  next();
});

export default router;