<template>
  <div class="hello-world">
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

    <b-container id="main">
      <b-row>
        <b-col cols="3">
          <b-card 
            title="Settings"
            sub-title="Configure subscriptions">
            <b-form-group label="Organisations">
              <b-form-checkbox-group 
                v-model="selected"
                :options="options"
                stacked
                name="radiosStacked"/>
            </b-form-group>
          </b-card>
          
        </b-col>
        <b-col cols="9">
          <b-card 
            title="Commit Feed">
            <b-alert 
              show 
              variant="info">
              <h5 class="alert-heading">New commit!</h5>
              <p>
                Aww yeah, you successfully read this important alert message.
                This example text is going to run a bit longer so that you can see
                how spacing within an alert works with this kind of content.
              </p>
              <hr>
              <p class="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
              </p>
            </b-alert>
            <b-alert 
              show 
              variant="info">
              <h5 class="alert-heading">New commit!</h5>
              <p>
                Aww yeah, you successfully read this important alert message.
                This example text is going to run a bit longer so that you can see
                how spacing within an alert works with this kind of content.
              </p>
              <hr>
              <p class="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
              </p>
            </b-alert>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello',
      selected: [],
      options: [
        { text: '1DV527', value: '1DV527' },
        { text: '1DV600', value: '1DV600' },
        { text: '1DV612', value: '1DV612' }
      ]
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
#main {
  padding-top: 1em;
}
</style>
