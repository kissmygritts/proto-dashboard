<template>
  <div id="page" class="flex flex-row h-100">
    <div id="map" class="w-third">
      <l-map :zoom="6" :center="mapData.center" ref="map">
        <l-tile-layer :url="mapData.source" />
      </l-map>
    </div>
    <div id="content" class="w-two-thirds pa2 h-100 overflow-y-scroll">
      <div class="bg-white pa3">
        <!-- header -->
        <h2 class="f2 lh-title main">{{ encounters[0].ind_id }}</h2>
        <h3 class="f3 lh-title ttc">{{ encounters[0].common_name }}
          <span class="i silver">({{ encounters[0].species_name }})</span>
        </h3>

        <!-- action buttons -->
        <!-- marks -->
        <!-- devices -->
        <!-- tabs of info for each capture -->
      </div>
      <pre><code>{{ encounters }}</code></pre>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'
import { ENCOUNTER_BY_NDOWID_QUERY } from '../graphql/Encounter_ByNdowId'

export default {
  name: 'AnimalDetails',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      encounters: null,
      mapData: {
        center: L.latLng(40.2908, -117.874),
        source: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
      }
    }
  },
  apollo: {
    encounters: {
      query: ENCOUNTER_BY_NDOWID_QUERY,
      variables () {
        return {
          ndowId: this.$route.params.id
        }
      }
    }
  },
  computed: {
    coords () {
      return this
    }
  }
}
</script>

<style scoped>

</style>
