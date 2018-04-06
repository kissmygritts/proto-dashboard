<template>
  <div class="sidebar">

    <div class="logo">
      <h1 class="is-size-4">GUS</h1>
    </div>

    <div class="side-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <span class="icon is-large">
            <i class="flaticon-compass"></i>
          </span>
          <span class="nav-text is-size-5">Dashboard</span>
        </li>
        <li class="nav-item">
          <span class="icon is-large">
            <i class="flaticon-notebook-5"></i>
          </span>
          <span class="nav-text is-size-5">Efforts</span>
        </li>
        <li class="nav-item">
          <span class="icon is-large">
            <i class="flaticon-network"></i>
          </span>
          <span class="nav-text is-size-5">Species</span>
        </li>
        <li class="nav-item">
          <span class="icon is-large">
            <i class="flaticon-route"></i>
          </span>
          <span class="nav-text is-size-5">Telemetry</span>
        </li>
        <li class="nav-item">
          <span class="icon is-large">
            <i class="flaticon-map-1"></i>
          </span>
          <span class="nav-text is-size-5">Maps</span>
        </li>
        <li class="nav-item">
          <span class="icon is-large">
            <i class="flaticon-compose"></i>
          </span>
          <span class="nav-text is-size-5">Forms</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarNav'
}
</script>

<style scoped>
.sidebar {
  background-color: var(--main-color);
  color: white;
  min-width: 210px;
}

.logo {
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
}

.nav-list {
  display: flex;
  flex-direction: column;
  padding-top: 16px;
}

.nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 4px;
  padding-bottom: 4px;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, .1);
}

.nav-text {
  padding-left: .5rem;
}

[class^="flaticon-"]:before, [class*="flaticon-"]:before,
[class^="flaticon-"]:after, [class*="flaticon-"]:after {
  font-size: 30px;
  text-align: center;
  margin: 0;
}
</style>
