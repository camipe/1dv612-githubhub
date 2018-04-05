<template>
  <div class="hello">
    <b-navbar 
      toggleable="md" 
      type="dark" 
      variant="info">

      <b-navbar-toggle target="nav_collapse"/>

      <b-navbar-brand href="#">Githubhub</b-navbar-brand>

      <b-collapse 
        is-nav 
        id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Feed</b-nav-item>
          <b-nav-item href="#">Settings</b-nav-item>
          <b-nav-item href="#">Log In</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <h1>{{ msg }}</h1>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
