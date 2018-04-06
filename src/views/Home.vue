<template>
  <div class="home">
    <status-bar />
    <item-list />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ItemList from '@/components/ItemList.vue'
import StatusBar from '@/components/StatusBar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    StatusBar,
    ItemList
  }
}
</script>
