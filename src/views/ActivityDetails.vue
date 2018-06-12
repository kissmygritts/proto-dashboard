<template>
  <div class="content-wrapper flex flex-row items-start mt3 w-90 center">

    <!-- main content panel -->
    <div id="document" class="bg-white w-70 pa3 br2" v-if="!$apollo.loading">
      <h1 class="f2 lh-title ttc">{{ activity.activity_name }}</h1>

      <h2 class="f3 lh-title mt3 mb2">Activity Description</h2>
      <p class="f5 lh-copy ph2">{{ activity.activity_description }}</p>

      <h2 class="f3 lh-title mt3 mb2">Encounters Table</h2>
      <p class="f5 lh-copy ph2">
        All the animals encountered during this activity are in the table below.
        This is a short summary of each animal. If you would like more info on
        individual animals click on their NDOWID.
        <!--
          TODO: create a drawer component, when clicking on animal, it'll display
          all the information for that animal. This component will also be used
          on the dashboard.
         -->
      </p>
      <!-- encounters table -->
      <div id="encounter-table" class="mt3">
        <table class="f6 w-100 mw8 center">
          <thead>
            <tr>
              <th
                v-for="(field, index) in encounterTableFields"
                :key="index"
                class="fw6 bb bb-black-20 tl pb1 pr3 bg-white"
              >
                {{ field.alias }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- if there aren't encounters -->
            <tr v-if="!hasEncounters">
              <td class="tc pv3 pr3 bb b--black-20 center" colspan="6">This activity doesn't have any encounters yet <span class="f5">&#x1F61E;</span></td>
            </tr>
            <!-- if there are encounters -->
            <tr
              v-else
              v-for="(encounter, index) in activity.encounters"
              :key="index"
            >
              <td
                class="pv2 pr3 bb b--black-20"
                v-for="(field, index) in encounterTableFields"
                :key="index"
              >
                {{ encounter[field.prop] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="f3 lh-title mt3 mb2">Encounter Map</h2>
      <p class="f5 lh-copy ph2">
        The capture locations of all the animals encountered during this activity
        are shown in the map below. The map is interactive. You can click on each
        point on the map for information about that animal.
        <!-- TODO: create map with leaflet -->
      </p>

      <pre class="mt5"><code>{{ $data }}</code></pre>
    </div>
  </div>
</template>

<script>
import { ACTIVITY_BY_ID_QUERY } from '../graphql/Activity_ByIdQuery'

export default {
  name: 'ActivityDetails',

  data () {
    return {
      activity: {},
      loading: 0,
      encounterTableFields: [
        { prop: 'common_name', alias: 'species' },
        { prop: 'ind_id', alias: 'NDOWID' },
        { prop: 'sex', alias: 'sex' },
        { prop: 'age_class', alias: 'age' },
        { prop: 'n', alias: 'count' },
        { prop: 'animal_status', alias: 'status' }
      ]
    }
  },

  computed: {
    hasEncounters () {
      if (!this.$apollo.loading) {
        return this.activity.encounters.length > 0
      }
    }
  },

  apollo: {
    activity: {
      query: ACTIVITY_BY_ID_QUERY,
      variables () {
        return {
          activityId: this.$route.params.id
        }
      }
    }
  }
}
</script>

<style>

</style>
