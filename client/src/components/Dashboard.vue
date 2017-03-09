<template>
  <div class="dashboard">
    <section class="section">
      <div class="columns">
        <repoPicker :activeOrgName="orgName"></repoPicker>
        <repo></repo>
        {{orgName}}
      </div>
    </section>
  </div>
</template>

<script>
import RepoPicker from './RepoPicker.vue'
import Repo from './Repo.vue'

export default {
  name: 'dashboard',
  props: ['orgName'],
  data () {
    return {
      msg: ''
    }
  },
  components: {
    RepoPicker,
    Repo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
