<template>
  <div class="sidebar">

    <div class="flex flex-column">

      <div class="pa2 flex flex-column items-center mb1 mt2 pointer" @click="goHome">
        <div id="icon">
          <img src="../assets/logo.png" alt="dog logo">
        </div>
      </div>

      <!-- <router-link to="/efforts"> -->
      <router-link to="/efforts" class="pa2 flex flex-column items-center mb1 nav-item">
        <div class="icon mb1">
          <i class="flaticon-notebook-5"></i>
        </div>
        <div class="nav-item-text f6 lh-copy">
          efforts
        </div>
      </router-link>
      <!-- </router-link> -->

      <div class="pa2 flex flex-column items-center mb1 nav-item">
        <div class="icon mb1">
          <i class="flaticon-network"></i>
        </div>
        <div class="nav-item-text f6 lh-copy">
          species
        </div>
      </div>

      <div class="pa2 flex flex-column items-center mb1 nav-item">
        <div class="icon mb1">
          <i class="flaticon-route"></i>
        </div>
        <div class="nav-item-text f6 lh-copy">
          telemetry
        </div>
      </div>

      <div class="pa2 flex flex-column items-center mb1 nav-item">
        <div class="icon mb1">
          <i class="flaticon-map-1"></i>
        </div>
        <div class="nav-item-text f6 lh-copy">
          maps
        </div>
      </div>

      <router-link to="/forms" class="pa2 flex flex-column items-center mb1 nav-item">
        <div class="icon mb1">
          <i class="flaticon-compose"></i>
        </div>
        <div class="nav-item-text f6 lh-copy">
          forms
        </div>
      </router-link>

    </div>

  </div>
</template>

<script>
import '../assets/css/logos/flaticon.css'
export default {
  name: 'SidebarNav',

  methods: {
    goHome () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style scoped>
img {
  width: 42px;
  height: 42px;
}

.sidebar {
  background-color: var(--main-color);
  color: white;
  width: 80px;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, .1);
}

.nav-item--active {
  background-color: rgba(255, 255, 255, .25);
}

[class^="flaticon-"]:before, [class*="flaticon-"]:before,
[class^="flaticon-"]:after, [class*="flaticon-"]:after {
  font-size: 30px;
  text-align: center;
  margin: 0;
}
</style>
