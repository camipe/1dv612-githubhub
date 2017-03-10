import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'
import Newsfeed from '@/components/Newsfeed.vue'
import SubscriptionSettings from '@/components/SubscriptionSettings.vue'

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
      name: 'OrgSelected',
      component: Dashboard,
      props: true
    },
    {
      path: '/:orgName/:repoID',
      name: 'RepoSelected',
      component: Dashboard,
      props: true,
      children: [
        {
          path: 'feed',
          name: 'ShowFeed',
          component: Newsfeed
        },
        {
          path: 'settings',
          name: 'ShowSettings',
          component: SubscriptionSettings
        }
      ]
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
