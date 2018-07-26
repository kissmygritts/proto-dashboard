<template>
  <div id="dashboard" class="flex flex-row items-start w-100 h-100">
    <div id="encounters" class="w-third h-100 flex flex-column pa2 overflow-y-scroll justify-between">

      <encounter-card
        class="pointer"
        v-for="(encounter, index) in encounterCardProp"
        :key="index"
        :encounter="encounter"
        @click="toggleDrawer"
      />
    </div>
    <div id="map" class="bg-green h-100" ref="mapContainer">
      <l-map :center="mapCenter" :zoom="7" ref="mapElement">

        <l-control-layers :position="layersPosition" />
        <l-tile-layer
          v-for="(layer, index) in tileLayers"
          :key="index+100"
          layerType="base"
          :name="layer.name"
          :visible="layer.visible"
          :url="layer.url"
        />

        <l-circle-marker
          v-for="(point, index) in mapPoints"
          :key="index"
          :latLng="point"
          :radius="5"
          :weight="1"
          color="#6958d0"
          fillColor="#6958d0"
          :fillOpacity=".65"
        />
      </l-map>
    </div>

    <transition name="slide">
      <drawer
        class="drawer"
        :visible="drawerVisible"
        :eventId="currentEventId"
        :drawerWidth="mapWidth"
        @close="closeDrawer"
      />
    </transition>

  </div>
</template>

<script>
import EncounterCard from '@/components/EncounterCard'
import Drawer from '@/components/organisms/Drawer'
import { LMap, LTileLayer, LCircleMarker, LControlLayers } from 'vue2-leaflet'
import L from 'leaflet'
import { ALL_ENCOUNTERS_QUERY } from '@/graphql/Encounters_AllQuery.js'

const tileLayers = [
  {
    name: 'Default',
    visible: true,
    url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
  }, {
    name: 'Topographic',
    visible: false,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
  }, {
    name: 'Satelite',
    visible: false,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  }
]

export default {
  name: 'home',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LControlLayers,
    EncounterCard,
    Drawer
  },
  data () {
    return {
      encounters: [],
      drawerVisible: false,
      mapWidth: 0,
      currentEventId: null,
      tileLayers,
      layersPosition: 'topright'
    }
  },
  apollo: {
    encounters: {
      query: ALL_ENCOUNTERS_QUERY
    }
  },
  computed: {
    encounterCardProp () {
      if (this.encounters) {
        return this.encounters.map(m => ({
          ind_id: m.ind_id,
          activity_name: m.activity_name,
          common_name: m.common_name,
          event_timestamp: m.event_timestamp,
          sex: m.sex,
          age: m.age_class,
          status: m.animal_status,
          event_id: m.event_id
        }))
      }
    },
    mapBounds () {
      if (this.mapPoints) {
        return L.latLngBounds(this.mapPoints)
      }
    },
    mapCenter () {
      return L.latLng([38.57672222742784, -117.2717571258545])
    },
    mapPoints () {
      if (this.encounters) {
        return this.encounters.map(m => L.latLng([m.y, m.x]))
      }
    }
  },
  methods: {
    toggleDrawer (eventId) {
      this.currentEventId = eventId
      this.mapWidth = this.$refs.mapContainer.clientWidth
      this.drawerVisible = this.drawerVisible ? this.drawerVisible : !this.drawerVisible
    },
    closeDrawer () {
      this.drawerVisible = false
    },
    calcMapWidth () {
      console.log(this.$refs.mapContainer.clientWidth)
      this.mapWidth = this.$refs.mapContainer.clientWidth
    }
  }
}
</script>

<style scoped>
#encounters {
  max-width: 450px;
  min-width: 350px;
}

#map {
  flex-grow: 1;
}
.card-left {
  box-shadow: 10px 0px 3px -10px #999999;
}

.year {
  font-size: 1.125em;
  letter-spacing: .15em;
  font-weight: 600;
}

.date {
  font-size: .875em;
  letter-spacing: .1em;
}

.card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right-bottom {
  display: flex;
  justify-content: space-around;
}

.metric {
  /* color: #bababa; */
  font-size: .75em;
  letter-spacing: .08em;
  text-align: center;
}

.field-name {
  text-transform: uppercase;
  /* border-bottom: 1px solid #bababa; */
  padding-bottom: 2px;
}

.field-data {
  text-transform: capitalize;
  padding-top: 2px;
}

.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  /* width: 66%; */
  right: 0px;
  z-index: 1001;
  transition: transform .3s ease-in-out;
}

.drawer-active {
  transform: translateX(-540px);
}

.slide-enter-active, .slide-leave-active {
  transition: all .15s ease-out;
}

.slide-enter, .slide-leave-to {
  transform: translateX(540px);
}
</style>
