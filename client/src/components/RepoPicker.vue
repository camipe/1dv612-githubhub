<template>
  <div class="column is-one-quarter">
    <nav class="panel">
      <div class="container">
        <p class="panel-heading">
          Organizations
        </p>
        <router-link :to="{name: 'DashboardWithOrg', params: {orgName: name}}"class="panel-block" v-for="name in orgNames">
          <span class="panel-icon">
            <i class="fa fa-sitemap"></i>
          </span>
          {{name}}
        </router-link>
        <p class="panel-heading">
          Repositories
        </p>
        <a class="panel-block"  v-for="repo in orgRepos">
          <span class="panel-icon">
            <i class="fa fa-book"></i>
          </span>
          {{repo.name}}
        </a>
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
    orgNames () {
      return this.$store.getters.orgNames
    },
    orgRepos () {
      return this.$store.getters.orgRepos
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
