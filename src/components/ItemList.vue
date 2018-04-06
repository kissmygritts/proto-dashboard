<template>
  <div class="item-list">
    <item v-for="(effort, index) in data" :key="index" :item="effort" />
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
const data = [
  {
    effort_name: 'mule deer captures',
    effort_summary: 'Spicy jalapeno bacon ipsum dolor amet doner buffalo pork capicola chicken venison short ribs bresaola chuck biltong pancetta brisket. Corned beef cow tenderloin, shoulder pork chop meatball beef ribs ribeye shankle pork belly kevin filet mignon.',
    effort_tags: [ 'mule deer' ]
  }, {
    effort_name: 'elk captures',
    effort_summary: 'Spicy jalapeno bacon ipsum dolor amet doner buffalo pork capicola chicken venison short ribs bresaola chuck biltong pancetta brisket. Corned beef cow tenderloin, shoulder pork chop meatball beef ribs ribeye shankle pork belly kevin filet mignon.',
    effort_tags: [ 'rmel' ]
  }, {
    effort_name: 'bighorn captures',
    effort_summary: 'Spicy jalapeno bacon ipsum dolor amet doner buffalo pork capicola chicken venison short ribs bresaola chuck biltong pancetta brisket. Corned beef cow tenderloin, shoulder pork chop meatball beef ribs ribeye shankle pork belly kevin filet mignon.',
    effort_tags: [ 'cbhs', 'dbhs', 'rbhs' ]
  }, {
    effort_name: 'raptor telemetry',
    effort_summary: 'Spicy jalapeno bacon ipsum dolor amet doner buffalo pork capicola chicken venison short ribs bresaola chuck biltong pancetta brisket. Corned beef cow tenderloin, shoulder pork chop meatball beef ribs ribeye shankle pork belly kevin filet mignon.',
    effort_tags: [ 'goea', 'goha' ]
  }, {
    effort_name: 'road cruising',
    effort_summary: 'Spicy jalapeno bacon ipsum dolor amet doner buffalo pork capicola chicken venison short ribs bresaola chuck biltong pancetta brisket. Corned beef cow tenderloin, shoulder pork chop meatball beef ribs ribeye shankle pork belly kevin filet mignon.',
    effort_tags: [ 'phpl', 'scoc', 'scsp', 'crbi' ]
  }
]
export default {
  name: 'ItemList',
  components: { Item },
  data () {
    return {
      data
    }
  }
}
</script>

<style scoped>
.item-list {
  width: 75%;
  display: flex;
  flex-direction: column;
  margin: 24px auto;
  /* border: 1px solid black; */
}
</style>
