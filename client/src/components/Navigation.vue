<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="info">

    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand href="#">Githubhub</b-navbar-brand>

    <b-collapse
      id="nav_collapse"
      is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>{{ `User: ${$auth.user.name || 'unknown'}` }}</b-nav-item>
        <b-nav-item
          v-if="$auth.user !== null"
          href="#">Log Out</b-nav-item>
        <b-nav-item
          v-else
          href="#">Log In</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: 'Navigation',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
