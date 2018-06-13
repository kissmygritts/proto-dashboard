<template>
  <div class="content-wrapper flex flex-row items-start mv3 w-100 ph4 center">

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

      <!-- encounters map -->
      <h2 class="f3 lh-title mt3 mb2">Encounter Map</h2>
      <p class="f5 lh-copy ph2">
        The capture locations of all the animals encountered during this activity
        are shown in the map below. The map is interactive. You can click on each
        point on the map for information about that animal.
      </p>
      <div class="leaflet mt3">
        <!-- TODO: set the zoom of the map dynamically based on the bounds: https://github.com/KoRiGaN/Vue2Leaflet#faq-->
        <l-map :bounds="bounds" :zoom="6" ref="map">
          <l-tile-layer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"></l-tile-layer>
          <!-- TODO: add marker popups, https://github.com/KoRiGaN/Vue2Leaflet/blob/master/examples/src/components/MarkerPopup.vue -->
          <l-marker
            v-for="(point, index) in mapPoints"
            :key="index"
            :lat-lng="point" />
        </l-map>
      </div>

      <!-- <pre class="mt5"><code>{{ $data }}</code></pre> -->
    </div>

    <!-- side panel -->
    <div id="metadata-wrapper" class="w-30 ml3 mid-gray">

      <!-- metadata box -->
      <div id="metadata">

        <ul class="list pl0 ml0 center">
          <li class="pa1 main">
            Activity Metadata
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Type</dd>
              <dd class="f5 fw4 ml0">{{ activity.activity_type }}</dd>
            </dl>
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Start Date</dd>
              <dd class="f5 fw4 ml0">{{ activity.activity_start_date }}</dd>
            </dl>
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Duration</dd>
              <dd class="f5 fw4 ml0">{{ activity.activity_duration }} {{ activity.activity_time_frame }}</dd>
            </dl>
          </li>
          <li class="pa2" v-if="activity.encounters">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">No. Encounters</dd>
              <dd class="f5 fw4 ml0">{{ activity.encounters.length }}</dd>
            </dl>
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Activity ID</dd>
              <dd class="f6 fw4 ml0">{{ activity.id }}</dd>
            </dl>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'
import { ACTIVITY_BY_ID_QUERY } from '../graphql/Activity_ByIdQuery'

// import 'leaflet/dist/leaflet.css'

export default {
  name: 'ActivityDetails',

  components: {
    LMap,
    LTileLayer,
    LMarker
  },

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
      ],
      mapData: {
        center: L.latLng(40.2908, -117.874)
      }
    }
  },

  computed: {
    hasEncounters () {
      if (!this.$apollo.loading) {
        return this.activity.encounters.length > 0
      }
    },
    mapPoints () {
      if (!this.$apollo.loading) {
        return this.activity.encounters.map(m => L.latLng([m.y, m.x]))
      }
    },
    bounds () {
      if (this.mapPoints) {
        return L.latLngBounds(this.mapPoints)
      }
    },
    mapCenter () {
      if (this.mapPoints) {
        const arrLength = this.mapPoints.length

        const lng = this.mapPoints
          .map(m => m.lng)
          .reduce((acc, curr) => acc + curr)
        const lat = this.mapPoints
          .map(m => m.lat)
          .reduce((acc, curr) => acc + curr)

        const centroidLng = lng / arrLength
        const centroidLat = lat / arrLength

        return L.latLng(centroidLat, centroidLng)
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

<style scoped>
.leaflet {
  height: 300px;
}
</style>
