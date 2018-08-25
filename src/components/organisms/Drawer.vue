<template>
  <div
    id="drawer"
    class="flex flex-row items-start pa3 bg-near-white overflow-y-scroll"
    :style="styleObject"
    v-if="visible"
  >
    <div class="bg-white br2 w-100 ph3 pb3" v-if="!$apollo.loading">
      <h1 class="f2 lh-title ttc mb2">2017-10-19 07:32:00</h1>
      <h2 class="f5 lh-copy ttc gray">Encounter Type: {{ event.event_type }}</h2>
      <h2 class="f5 lh-copy ttc gray mb2">Event ID: {{ eventId }}</h2>

      <a @click="emitClose" class="f6 link br2 ba ph3 pv2 dib blue mr2 bg-animate hover-bg-blue hover-white">Close</a>
      <a id="delete-button" class="f6 link br2 ba ph3 pv2 dib orange mr2 bg-animate hover-bg-orange hover-white">Update Event</a>
      <a id="delete-button" class="f6 link br2 ba ph3 pv2 dib red mr2 bg-animate hover-bg-red hover-white">Delete Event</a>

      <h2 class="f3 lh-title mt3 mb2">Encounter Table</h2>
      <p class="f5 lh-copy ph2">
        All the animals for this encounter event are displayed in the table below.
        An event is a unique observation of an animal(s). Any method of observation
        is valid. This includes capture, visual, auditory, or sign. An event can
        include the observation of many animals, or just a single animal.
      </p>

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

      <!-- if any animals are recaptures -->
      <h2 class="f3 lh-title mt3 mb2">Recaptures</h2>
      <p class="f5 lh-copy ph2">
        The following animals have been encountered in the past.
      </p>

      <!-- marks -->
      <h2 class="f3 lh-title mt3 mb2">Marks</h2>
      <p class="f5 lh-copy ph2">
        The following animals have these marks.
      </p>
      <simple-table
        class="mt3"
        :data="marksTable"
      />

      <!-- devices -->
      <h2 class="f3 lh-title mt3 mb2">Devices</h2>
      <p class="f5 lh-copy ph2">
        The following animals have these devices.
      </p>

      <pre class="mt4"><code>{{ marksTable }}</code></pre>
    </div>
  </div>
</template>

<script>
import { EVENT_BY_ID_QUERY } from '@/graphql/Event_ByIdQuery'
import SimpleTable from '@/components/molecules/SimpleTable'

export default {
  name: 'Drawer',
  components: { SimpleTable },
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
      return ['species', 'id', 'age', 'sex', 'n']
    },
    marksTable () {
      if (!this.$apollo.loading) {
        return this.event.animals.map(m => {
          let indId = m.ind_id

          return m.marks.map(n => ({
            indId,
            markType: n.mark_type,
            markColor: n.mark_color,
            markId: n.mark_id,
            dateGiven: n.date_given
          }))
        })
          .reduce((acc, curr) => {
            return acc.concat(curr)
          })
      }
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
