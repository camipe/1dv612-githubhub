<template>
  <div class="hello-world">
    <navigation :is-logged-in="loggedIn"/>
    <b-container id="main">
      <b-row>
        <settings :organisations="options"/>
        <feed :commits="commits"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Settings from '@/components/Settings';
import Feed from '@/components/Feed';

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
      options: [
        { text: '1DV527', value: '1DV527' },
        { text: '1DV600', value: '1DV600' },
        { text: '1DV612', value: '1DV612' }
      ],
      loggedIn: true,
      commits: [
        {
          id: 1,
          message: 'Added new functions',
          author: 'Bill Gates'
        },
        {
          id: 2,
          message: 'Fixed lots of bugs and added tons of features.',
          author: 'hacker 4chan'
        },
        {
          id: 3,
          message: '[fix]"vue/prop-name-casing" to not warn variable computed property',
          author: 'ota-meshi'
        }
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
