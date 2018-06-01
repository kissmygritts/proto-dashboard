<template>
  <div class="autocomplete">
    <label>autocomplete</label>
    <input
      type="text"
      v-model="search"
      @input="onChange"
    />
    <ul class="autocomplete-results" v-show="isOpen">
      <li
        class="autocomplete-result"
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
      >
        {{ result }}
      </li>
    </ul>

    <hr>

    <pre><code>{{ $data }}</code></pre>
  </div>
</template>

<script>
const items = ['apple', 'banana', 'orange', 'mango', 'pear', 'asian pear', 'pineapple']

export default {
  name: 'autocomplete',

  data () {
    return {
      search: '',
      results: [],
      isOpen: false,
      items: items
    }
  },

  methods: {
    onChange () {
      this.isOpen = true
      this.filterResults()
    },
    filterResults () {
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
    },
    setResult (result) {
      this.search = result
      this.isOpen = false
    }
  }

}
</script>

<style>

</style>
