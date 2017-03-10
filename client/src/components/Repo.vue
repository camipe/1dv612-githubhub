<template>
  <div class="column">
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <router-link :to="{name: 'ShowFeed'}" tag="li"><a>Feed</a></router-link>
        <router-link :to="{name: 'ShowSettings'}" tag="li"><a>Notifications</a></router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Newsfeed from './Newsfeed.vue'
import SubscriptionSettings from './SubscriptionSettings.vue'

export default {
  name: 'repo',
  components: {
    Newsfeed,
    SubscriptionSettings
  },
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
