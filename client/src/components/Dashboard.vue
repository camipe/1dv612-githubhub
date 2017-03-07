<template>
  <div class="dashboard">
    <navbar></navbar>
    <section class="section">
      <div class="columns">
        <repoPicker></repoPicker>
        <repo></repo>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import RepoPicker from './RepoPicker.vue'
import Repo from './Repo.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    Navbar,
    RepoPicker,
    Repo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
