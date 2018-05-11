<template>
  <div class="callback"/>
</template>

<script>
export default {
  name: 'Callback',
  mounted() {
    this.$auth.handleAuthentication()
      .then(() => {
        this.$router.push({ name: 'MainPage' });
      })
      .catch(error => console.log(error));
  },
};
</script>
