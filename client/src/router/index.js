import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/MainPage';
import Callback from '@/components/Callback.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
  ],
});

// force login
router.beforeEach((to, from, next) => {
  if (to.name === 'Callback') { // check if "to"-route is "callback" and allow access
    next();
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next();
  } else { // trigger auth0 login
    router.app.$auth.login();
  }
});

export default router;
