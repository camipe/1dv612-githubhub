// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import moment from 'vue-moment';
import auth from '@/auth';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(auth);
Vue.use(BootstrapVue);
Vue.use(moment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
