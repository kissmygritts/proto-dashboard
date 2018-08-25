<template>
  <div>

    <table class="f6 w-100 mw8 center">
      <thead>
        <tr>
          <th
            class="fw6 bb bb-black-20 tl pb1 pr3 bg-white"
            v-for="(field, index) in displayFields"
            :key="index"
          >
            {{ field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
        >
          <td
            class="pv2 pr3 bb b--black-20"
            v-for="(field, index) in displayFields"
            :key="index"
          >
            {{ row[field] }}
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'SimpleTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    fields: {
      type: [Object, Array],
      required: false
    }
  },
  computed: {
    displayFields () {
      if (this.fields) {
        return this.fields
      } else {
        return Object.keys(this.data[0])
      }
    }
  }

}
</script>

<style scoped>

</style>
