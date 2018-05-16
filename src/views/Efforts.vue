<template>
  <div class="efforts">
    <div class="efforts-list">
      <item-list />
    </div>
      <div class="sidebar">
        <button class="button is-purple is-fullwidth">Add Effort</button>
        <div class="options">options</div>
      </div>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import StatusBar from '@/components/StatusBar.vue'

export default {
  name: 'effort',
  components: {
    StatusBar,
    ItemList
  }
}
</script>

<style scoped>
.efforts {
  margin: 16px 0;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
}
.efforts-list {
  flex-grow: 1;
  margin-right: 16px;
}

.sidebar {
  width: 30%;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
}

.is-purple {
  background-color: var(--main-color);
  color: white;
}

.is-purple:hover {
  color: var(--main-color);
  border-color: var(--main-color);
  background-color: var(--near-white);
}
</style>
