<template>
  <div
    id="drawer"
    class="flex flex-row items-start pa3 bg-near-white"
    :style="styleObject"
    v-if="visible"
  >
    <div class="bg-white br2 w-100 ph3 pb3">
      <h1 class="f2 lh-title ttc mb2">2017-10-19 07:32:00</h1>
      <h2 class="f5 lh-title ttc silver mb2">{{ eventId }}</h2>

      <a @click="emitClose" class="f6 link br2 ba ph3 pv2 dib blue mr2 bg-animate hover-bg-blue hover-white">Close</a>
      <a id="delete-button" class="f6 link br2 ba ph3 pv2 dib orange mr2 bg-animate hover-bg-orange hover-white">Update Event</a>
      <a id="delete-button" class="f6 link br2 ba ph3 pv2 dib red mr2 bg-animate hover-bg-red hover-white">Delete Event</a>

      <pre class="mt4"><code>{{ event }}</code></pre>
    </div>
  </div>
</template>

<script>
import { EVENT_BY_ID_QUERY } from '@/graphql/Event_ByIdQuery'

export default {
  name: 'Drawer',
  props: [ 'visible', 'eventId', 'drawerWidth' ],
  data () {
    return {
      event: null
    }
  },
  apollo: {
    event: {
      query: EVENT_BY_ID_QUERY,
      variables () {
        return { eventId: this.eventId }
      }
    }
  },
  computed: {
    styleObject () {
      return { width: `${this.drawerWidth}px` }
    }
  },
  methods: {
    emitClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
