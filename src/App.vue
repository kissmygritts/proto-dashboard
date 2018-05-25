<template>
  <div id="app">
    <sidebar-nav />
    <div class="main-panel">
      <status-bar />
      <router-view/>
    </div>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  </div>
</template>

<script>
import SidebarNav from '@/components/SidebarNav.vue'
import StatusBar from '@/components/StatusBar.vue'

// import css stylesheets
import 'bulma/css/bulma.css'
import 'tachyons/css/tachyons.css'
import './assets/css/main.css'
import './assets/css/icons/flaticon.css'

export default {
  components: {
    SidebarNav,
    StatusBar
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
}

.main-panel {
  flex-grow: 1;
  background-color: var(--near-white);
  overflow-y: auto;
}
</style>
