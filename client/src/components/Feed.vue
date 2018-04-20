<template>
  <b-col cols="9">
    <b-card
      title="Commit Feed">
      <div
        v-for="issue in sortedIssues"
        :key="issue.id">
        <b-alert
          show
          variant="info">
          <h4>[{{ issue.status }}] {{ issue.title }}</h4>
          <p class="mb-0">
            Reported by {{ issue.author }} <br>
            Organization: {{ issue.org }} <br>
            Repository: {{ issue.repo }} <br>
            {{ issue.createdAt | moment('MMMM Do YYYY, h:mm:ss a') }}
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
      default: () => [],
    },
  },
  computed: {
    sortedIssues() {
      const sorted = [...this.issues];
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sorted;
    },
  },
};
</script>
