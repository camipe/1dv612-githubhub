<template>
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
        <b-nav-item 
          href="#" 
          v-if="isLoggedIn === true">Log Out</b-nav-item>
        <b-nav-item 
          href="#" 
          v-else>Log In</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: 'Navigation',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    }
  },
}
</script>
