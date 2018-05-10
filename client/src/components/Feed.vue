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
          <h4><a :href="issue.url">[{{ issue.status }}] {{ issue.title }}</a></h4>
          <p class="mb-0">
            Reported by <a :href="issue.author.url">{{ issue.author.name }}</a><br>
            Organization: <a :href="issue.orgUrl">{{ issue.org }}</a><br>
            Repository: <a :href="issue.repoUrl">{{ issue.repo }}</a><br>
            {{ issue.createdAt | moment('MMMM Do YYYY, h:mm:ss a') }}
          </p>
        </b-alert>
      </div>
    </b-card>
  </b-col>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Feed',
  data() {
    return {
      issues: [],
    };
  },
  computed: {
    sortedIssues() {
      const sorted = [...this.issues];
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sorted;
    },
  },
  mounted() {
    this.getIssues();
  },
  methods: {
    async getIssues() {
      try {
        const res = await axios({
          url: 'http://localhost:7777/issues',
          headers: { Authorization: `Bearer ${this.$auth.token}` },
        });
        this.issues = res.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
