<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="#" class="navbar-item">
        <!-- <h1 class="is-size-5 is-capitalized">{{ $route.name }}</h1> -->
        <h1 class="f3 main fw3 ttc ma1 pa0 lh-title">{{ $route.name }}</h1>
      </a>

      <a href="#" class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <a href="#" class="navbar-item"><i class="flaticon-settings-8"></i></a>
        <a href="#" class="navbar-item"><i class="flaticon-user"></i></a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'StatusBar'
}
</script>

<style scoped>
[class^="flaticon-"]:before, [class*="flaticon-"]:before,
[class^="flaticon-"]:after, [class*="flaticon-"]:after {
  font-size: 24px;
  text-align: center;
  margin: 0;
  color: grey;
}
</style>
