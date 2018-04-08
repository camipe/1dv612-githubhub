<template>
  <div class="callback">Callback</div>
</template>

<script>
export default {
  name: 'Callback',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'MainPage' })
    })
  }
}
</script>