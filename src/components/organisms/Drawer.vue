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

      <div id="encounter-table" class="mt3">
        <table class="f6 w-100 mw8 center">
          <thead>
            <tr>
              <th
                class="fw6 bb bb-black-20 tl pb1 pr3 bg-white"
                v-for="(field, index) in encounterTableFields"
                :key="index"
              >
                {{ field }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(encounter, index) in encounterTable"
              :key="index"
            >
              <td
                class="pv2 pr3 bb b--black-20"
                v-for="(field, index) in encounterTableFields"
                :key="index"
              >
                {{ encounter[field] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre class="mt4"><code>{{ encounterTable }}</code></pre>
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
      },
      skip () {
        return !this.visible
      }
    }
  },
  computed: {
    styleObject () {
      return { width: `${this.drawerWidth}px` }
    },
    encounterTable () {
      if (!this.$apollo.loading) {
        return this.event.animals.map(m => ({
          species: m.species.common_name,
          age: m.age_class,
          sex: m.sex,
          n: m.n,
          id: m.ind_id
        }))
      }
    },
    encounterTableFields () {
      return ['species', 'age', 'sex', 'n', 'id']
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
