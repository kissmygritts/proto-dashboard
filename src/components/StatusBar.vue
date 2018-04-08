<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="#" class="navbar-item">
        <h1 class="is-size-5 is-capitalized">{{ $route.name }}</h1>
      </a>

      <a href="#" class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'StatusBar'
}
</script>

<style scoped>

</style>
