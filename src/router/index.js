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
  const token = localStorage.getItem(`${process.env.VUE_APP_NAME}.token`);

  if (to.name === 'login'){
    if (token){
      next({name: 'home'});
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token){
      next({name: 'login'});
    }
  }

  next();
});

export default router;