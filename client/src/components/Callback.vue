<template>
  <div class="callback">Callback</div>
</template>

<script>
export default {
  name: 'Callback',
  mounted() {
    this.$auth.handleAuthentication().then(() => {
      this.$router.push({ name: 'MainPage' });
    });
  },
};
</script>
