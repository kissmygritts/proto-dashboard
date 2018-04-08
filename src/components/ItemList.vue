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
    effort_summary: 'swine shankle biltong. Alcatra rump doner, pig salami bacon meatloaf jowl cow burgdoggen short ribs pork belly capicola. Tongue leberkas ham capicola, kevin frankfurter andouille turducken venison biltong shankle ground round porchetta. Flank jowl bresaola turkey, brisket ham hock tail shankle sausage tenderloin meatball chuck pig.',
    effort_tags: [ 'mule deer' ]
  }, {
    effort_name: 'elk captures',
    effort_summary: 'pork belly pork loin picanha frankfurter biltong. Ham biltong beef ribs fatback salami. Flank ribeye pork loin hamburger, tail buffalo porchetta landjaeger strip steak bresaola cow short loin leberkas pancetta alcatra. Brisket flank chicken beef cupim frankfurter. Kielbasa ball tip frankfurter, leberkas meatball hamburger capicola fatback porchetta t-bone burgdoggen chuck brisket drumstick. Pork alcatra venison ball tip short ribs cupim bresaola. Beef ribs buffalo sausage rump pastrami brisket, burgdoggen meatball.',
    effort_tags: [ 'rmel' ]
  }, {
    effort_name: 'bighorn captures',
    effort_summary: 'Bacon ipsum dolor amet tongue frankfurter pork salami meatball tail. Venison pork belly salami, strip steak brisket fatback tongue beef ribs jowl flank tri-tip. Short loin prosciutto ball tip jowl boudin turkey spare ribs brisket picanha. Fatback filet mignon shoulder venison short ribs, shankle capicola. Doner shank fatback flank picanha, capicola turducken tail.',
    effort_tags: [ 'cbhs', 'dbhs', 'rbhs' ]
  }, {
    effort_name: 'raptor telemetry',
    effort_summary: 'Spicy jalapeno bacon ipsum dolor amet doner buffalo pork capicola chicken venison short ribs bresaola chuck biltong pancetta brisket. Corned beef cow tenderloin, shoulder pork chop meatball beef ribs ribeye shankle pork belly kevin filet mignon.',
    effort_tags: [ 'goea', 'goha' ]
  }, {
    effort_name: 'road cruising',
    effort_summary: 'Chicken chuck t-bone venison ham hock ham short ribs turkey fatback andouille pancetta. Pork belly drumstick meatball shankle pork porchetta. Turkey beef ribs filet mignon chicken beef tail. ',
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
  /* width: 75%; */
  display: flex;
  flex-direction: column;
  /* margin: 24px auto; */
  /* border: 1px solid black; */
}
</style>
