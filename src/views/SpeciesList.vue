<template>
  <section class="mv2 mh6 bg-white br2">

    <div class="pt3 pl3 mb4">
      <h2 class="f3 lh-title main">NDOW Species List</h2>
      <p>Below is the Nevada species list sorted by genus.</p>
    </div>

    <div class="ph4">

      <ul
        v-for="(genus, index) in genusGroups"
        :key="index"
        class="list mb2"
      >
        <li class="bb b--light-silver f4 main lh-title mb2">{{ genus.name }}</li>
        <ul
          v-for="(species, index) in genus.species"
          :key="index"
          class="mt1 ml2"
        >
          <li>{{ species.common_name }} - <span class="i gray f6">{{ species.species_name }}</span></li>
        </ul>
      </ul>
    </div>
  </section>
</template>

<script>
import { ALL_SPECIES_QUERY } from '../graphql/Species_AllSpeciesList'

export default {
  name: 'species',

  data () {
    return {
      species: []
    }
  },

  apollo: {
    species: {
      query: ALL_SPECIES_QUERY
    }
  },

  computed: {
    genusGroups () {
      if (this.species) {
        const genusList = [...new Set(this.species.map(m => m.genus))]
          .sort()
          .map(m => {
            // return this.species.filter(f => f.genus === m)
            return {
              name: m,
              species: this.species.filter(f => f.genus === m),
              numSpecies: this.species.filter(f => f.genus === m).length
            }
          })

        return genusList
      }
    }
  }
}
</script>

<style scoped>

</style>
