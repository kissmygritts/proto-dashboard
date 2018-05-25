<template>
  <div class="item-list">
    <item v-for="(effort, index) in items" :key="index" :item="effort" />
  </div>
</template>

<script>
import Item from '@/components/Item.vue'

export default {
  name: 'ItemList',

  components: { Item },

  props: [ 'items' ]
}
</script>

<style scoped>
.item-list {
  /* width: 75%; */
  display: flex;
  flex-direction: column;
  /* margin: 24px auto; */
  /* border: 1px solid black; */
}
</style>
