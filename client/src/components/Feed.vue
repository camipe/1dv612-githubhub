<template>
  <b-col cols="9">
    <b-card 
      title="Commit Feed">
      <div 
        v-for="commit in commits"
        :key="commit.id">
        <b-alert
          show 
          variant="info">
          <p>
            {{ commit.message }}
          </p>
          <hr>
          <p class="mb-0">
            Author: {{ commit.author }}
          </p>
        </b-alert>
      </div>
    </b-card>
  </b-col>
</template>
<script>
export default {
  name: 'Feed',
  props: {
    commits: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
}
</script>