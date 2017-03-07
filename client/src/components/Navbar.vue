<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item">
        <img src="/static/images/logo.png" alt="Githubhub: The best hub">
      </a>
    </div>

    <!-- This "nav-menu" is hidden on mobile -->
    <!-- Add the modifier "is-active" to display it on mobile -->
    <div class="nav-right nav-menu">
      <a class="nav-item is-active">
        Dashboard
      </a>
      <a class="nav-item">
        Settings
      </a>
      <a class="nav-item" href="https://github.com/1dv612/mp222si-examination">
        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>
      <span class="nav-item">
        <a class="button is-primary">
          <span>Log out</span>
          <span class="icon">
            <i class="fa fa-sign-out"></i>
          </span>
        </a>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
