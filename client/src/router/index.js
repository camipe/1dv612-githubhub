import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      props: true
    },
    {
      path: '/:orgName',
      name: 'DashboardWithOrg',
      component: Dashboard,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*', component: NotFound
    }
  ]
})
