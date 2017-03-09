<template>
  <div class="column is-one-quarter">
    <nav class="panel">
      <div class="container">
        <p class="panel-heading">
          Organizations
        </p>
        <div class="panel-block" >
          <div class="control">
            <div class="select is-fullwidth">
              <select>
                <option v-for="name in orgNames">{{name}}</option>
              </select>
            </div>
          </div>
        </div>
        <p class="panel-heading">
          Repositories
        </p>
        <a class="panel-block" v-for="repo in orgRepos">
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
