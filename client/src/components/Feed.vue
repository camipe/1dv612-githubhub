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
          <p>
            {{ issue.message }}
          </p>
          <hr>
          <p class="mb-0">
            Author: {{ issue.author }}
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