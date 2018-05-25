<template>
  <div class="efforts">
    <div class="efforts-list">
      <item-list :items="efforts" />
    </div>
      <div class="sidebar">
        <button class="button is-purple is-fullwidth" @click="goToNewEffort">Add Effort</button>
        <div class="options">
          <h3 class="is-size-5 mt16 mb16">Filters</h3>

          <div class="field">
            <label class="label">Status</label>
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select>
                  <option
                    v-for="(status, index) in statusSelectors"
                    :key="index"
                    :value="status"
                  >
                    {{ status }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Agency</label>
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select>
                  <option
                    v-for="(agency, index) in agencySelectors"
                    :key="index"
                    :value="agency"
                  >
                    {{ agency }}
                  </option>
                </select>
              </div>
            </div>
          </div>

        </div>

        <!-- <hr>

        <pre><code>{{ $data }}</code></pre> -->
      </div>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import StatusBar from '@/components/StatusBar.vue'
import ALL_EFFORTS_QUERY from '../graphql/AllEffortsQuery'

export default {
  name: 'effort',

  components: {
    StatusBar,
    ItemList
  },

  data () {
    return {
      efforts: []
    }
  },

  apollo: {
    efforts: {
      query: ALL_EFFORTS_QUERY
    }
  },

  computed: {
    statusSelectors () {
      return [...new Set(this.efforts.map(m => m.effort_status))]
    },

    agencySelectors () {
      return [...new Set(this.efforts.map(m => m.effort_agency))]
    }
  },

  methods: {
    goToNewEffort () {
      this.$router.push('/forms/new-effort')
    }
  }
}
</script>

<style scoped>
.efforts {
  margin: 16px 0;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
}
.efforts-list {
  flex-grow: 1;
  margin-right: 16px;
}

.sidebar {
  width: 30%;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
}

.is-purple {
  background-color: var(--main-color);
  color: white;
}

.is-purple:hover {
  color: var(--main-color);
  border-color: var(--main-color);
  background-color: var(--near-white);
}

.options {
  padding: 8px;
}

.mt16 {
  margin-top: 16px;
}

.mb16 {
  margin-bottom: 16px;
}
</style>
