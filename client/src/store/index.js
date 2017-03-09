import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    orgs: [
      {
        'name': '1dv409',
        'id': 1,
        repos: [
          {
            name: 'Testrepo 1',
            id: '1',
            webhook: 'false',
            settings: {
              issues: 'false',
              member: 'false',
              push: 'false',
              release: 'false',
              watch: 'false'
            }
          },
          {
            name: 'Testrepo 3',
            id: '2',
            webhook: 'false',
            settings: {
              issues: 'false',
              member: 'false',
              push: 'false',
              release: 'false',
              watch: 'false'
            }
          }
        ]
      },
      {
        'name': '1dv612',
        'id': 2,
        repos: [
          {
            name: 'Testrepo 4',
            id: '3',
            webhook: 'false',
            settings: {
              issues: 'false',
              member: 'false',
              push: 'false',
              release: 'false',
              watch: 'false'
            }
          },
          {
            name: 'Testrepo 2',
            id: '4',
            webhook: 'false',
            settings: {
              issues: 'false',
              member: 'false',
              push: 'false',
              release: 'false',
              watch: 'false'
            }
          },
          {
            name: 'Testrepo 7',
            id: '5',
            webhook: 'false',
            settings: {
              issues: 'false',
              member: 'false',
              push: 'false',
              release: 'false',
              watch: 'false'
            }
          }
        ]
      },
      {
        'name': '1dv406',
        'id': 3,
        repos: [
          {
            name: 'Testrepo 5',
            id: '6',
            webhook: 'false',
            settings: {
              issues: 'false',
              member: 'false',
              push: 'false',
              release: 'false',
              watch: 'false'
            }
          },
          {
            name: 'Testrepo 6',
            id: '7',
            webhook: 'false',
            settings: {
              issues: 'false',
              member: 'false',
              push: 'false',
              release: 'false',
              watch: 'false'
            }
          }
        ]
      }
    ]
  },
  getters: {
    userOrgs: state => {
      return state.orgs
    }
  },
  mutations: {},
  actions: {}
})
