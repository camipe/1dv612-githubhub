import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/MainPage';
import Callback from '@/components/Callback.vue';

Vue.use(Router);

export default new Router({
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
