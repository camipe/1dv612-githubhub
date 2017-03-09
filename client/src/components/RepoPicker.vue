<template>
  <div class="column is-one-quarter">
    <nav class="panel">
      <div class="container">
        <p class="panel-heading">
          Organizations
        </p>
        <router-link :to="{name: 'OrgSelected', params: {orgName: org.name}}" class="panel-block" v-for="org in userOrgs" :key="org.id">
          <span class="panel-icon">
            <i class="fa fa-sitemap"></i>
          </span>
          {{org.name}}
        </router-link>
        <p class="panel-heading">
          Repositories
        </p>
        <router-link :to="{name: 'RepoSelected', params: {orgName: activeOrgName, repoID: repo.id}}" class="panel-block"  v-for="repo in orgRepos" :key="repo.id">
          <span class="panel-icon">
            <i class="fa fa-book"></i>
          </span>
          {{repo.name}}
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'repoPicker',
  props: ['activeOrgName'],
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    userOrgs () {
      return this.$store.getters.userOrgs
    },
    orgRepos () {
      const org = this.userOrgs.find(org => org.name === this.activeOrgName)
      return org.repos
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
