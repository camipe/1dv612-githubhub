<template>
  <b-col cols="9">
    <b-card 
      title="Commit Feed">
      <div 
        v-for="issue in issues"
        :key="issue.id">
        <b-alert
          show 
          variant="info">
          <h4>[{{ issue.status }}] {{ issue.title }}</h4>
          <span>Reported by {{ issue.author }} at {{ issue.createdAt }} </span>            
          <hr>
          <p class="mb-0">
            Organisation: {{ issue.org }} <br>
            Repository: {{ issue.repo }}
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
    issues: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
}
</script>