<template>
  <div class="hello-world">
    <navigation :user="$auth.user"/>
    <b-container id="main">
      <b-row>
        <settings :organisations="organisations"/>
        <feed :issues="issues"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Settings from '@/components/Settings';
import Feed from '@/components/Feed';
import axios from 'axios';

export default {
  name: 'MainPage',
    components: {
      Navigation,
      Settings,
      Feed
  },
  data () {
    return {
      msg: 'Hello',
      organisations: [],
      issues: []
    }
  },
  created() {
    try {
      axios.get(`http://localhost:7777/issues`)
      .then((res) => {
        this.organisations = res.data.organisations;
        this.issues = res.data.issues;
      })
      .catch((error) => {
        console.log(error);
      });



    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    subscribe: function() {
      // TODO: skicka subscribe information med axios
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
