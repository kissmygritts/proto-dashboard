<template>
  <div>
    <!-- form message -->
    <p class="mid-gray pa3 br1 bg-lightest-blue mb3">
      This form will walk you through the data entry workflow. You Follow the steps as outlined below.
    </p>

    <form class="w-100" enctype="multipart/form-data">

      <!-- select effort id -->
      <div class="mb3">
        <label for="effort-name" class="f6 b db mb1">Effort Name</label>
        <vue-simple-suggest
          mode="input"
          v-model="effort.model"
          :list="effortSelectionList"
          :filter-by-query="true"
          value-attribute="id"
          display-attribute="effort_name"
          @select="onSuggestSelectEffort"
        ></vue-simple-suggest>
      </div>

      <!-- select activity id -->
      <div class="mb3">
        <label for="effort-name" class="f6 b db mb1">Activity Name</label>
        <vue-simple-suggest
          mode="input"
          v-model="activity.model"
          :list="activities"
          :filter-by-query="true"
          value-attribute="id"
          display-attribute="activity_name"
          @select="onSuggestSelectActivity"
        ></vue-simple-suggest>
      </div>

      <!-- upload csv of animals data -->
      <div class="mb3">
        <label for="uploads" class="f6 b db mb1">Upload Files</label>
        <input
          type="file"
          name="uploads"
          class="button-reset"
          @change="filesChange($event.target.name, $event.target.files)"
        >
      </div>

    </form>

    <!-- csv data -->
    <div v-if="isSuccess">

      <p class="mid-gray pa3 br1 bg-washed-green mb3">
        Below are the contents of the uploaded .CSV file.
      </p>

      <p v-if="hasPapaParseError" class="mid-gray pa3 br1 bg-washed-red mb3">
        There was an error parsing your CSV file. Please double check your file for errors.
        Below is an explanation of the error. See <a href="https://github.com/kissmygritts/proto-dashboard/issues/7">this page</a>
        for an explanation of common errors.

        <pre class="bg-washed-red dark-red"><code>{{ csv.errors }}</code></pre>
      </p>

      <!-- table of displayData -->
      <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>
              <th v-for="(field, index) in displayFields" :key="index" class="fw6 bb b--black-20 tl pr3 bg-white">{{ field.alias }}</th>
            </tr>
          </thead>
          <tbody class="lh-copy">
            <tr v-for="(row, index) in csv.data" :key="index">
              <td v-for="(field, index) in displayFields" :key="index" class="pv3 pr3 bb b--black-20">{{ row[field.prop] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <button type="button" @click="submitUpload" class="f6 link dim br2 ba pv2 mb2 dib purple bg-white b--purple">Upload CSV</button>

    <pre><code>{{ eventInput }}</code></pre>
    <pre><code>{{ animalInput }}</code></pre>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import Papa from 'papaparse'
import { v4 } from 'uuid'

import { EFFORT_SELECTION_LIST_QUERY } from '../../graphql/Effort_SelectionListQuery'
import { ACTIVITY_SELECTION_LIST_QUERY } from '../../graphql/Activity_SelectionListQuery'
import { BULK_UPLOAD_MUTATION } from '../../graphql/DataEntry_BulkUploadMutation'

import { formatTimestamp } from '../../utils'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'DataEntry',
  components: {
    VueSimpleSuggest
  },

  data () {
    return {
      effort: {
        showDataEntry: false,
        select: false,
        selected: null,
        model: null
      },
      activity: {
        showDataEntry: false,
        select: true,
        selected: null,
        model: null
      },
      encounter: {
        showDataEntry: false,
        upload: true
      },
      effortSelectionList: [],
      activitySelectionList: [],
      uploadedFiles: [],
      uploadedError: null,
      currentStatus: null,
      uploadFieldName: 'files',
      csv: null,
      displayFields: [
        { prop: 'ind_id', alias: 'ndowid' },
        { prop: 'date', alias: 'date' },
        { prop: 'start_time', alias: 'start' },
        { prop: 'end_time', alias: 'end' },
        { prop: 'sex', alias: 'sex' },
        { prop: 'age_class', alias: 'age' },
        { prop: 'count', alias: 'count' },
        { prop: 'labid', alias: 'labId' }
      ]
    }
  },

  computed: {
    activities () {
      if (this.effort.selected) {
        return this.activitySelectionList
          .filter(i => i.effort_id === this.effort.selected.id)
      } else {
        return this.activitySelectionList
      }
    },
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    },
    hasPapaParseError () {
      if (this.csv) {
        return this.csv.errors.length > 0
      }
    },
    eventInput () {
      if (this.csv) {
        return this.csv.data.map((m, i) => ({
          id: this.ids[i].event,
          activity_id: this.activity.selected.id,
          event_timestamp: formatTimestamp(m.date, m.start_time),
          event_timestamp_end: formatTimestamp(m.date, m.end_time),
          event_type: m.event_type,
          x: parseFloat(m.x),
          y: parseFloat(m.y),
          datum: m.datum,
          source_app: 'gus upload template'
        }))
      }
    },
    animalInput () {
      if (this.csv) {
        return this.csv.data.map((m, i) => {
          return ({
            id: this.ids[i].animal,
            event_id: this.ids[i].event,
            species_id: m.species,
            ind_id: parseInt(m.ind_id),
            sex: m.sex,
            age_class: m.age_class,
            n: parseInt(m.count),
            animal_status: m.status,
            reencounter: m.reencounter === 'TRUE',
            comments: m.comments,
            observer: m.observer
          })
        })
      }
    },
    ids () {
      if (this.csv) {
        return Array.apply(null, Array(this.csv.data.length)).map(m => ({
          event: v4(),
          animal: v4()
        }))
      }
    }
  },

  apollo: {
    effortSelectionList: {
      query: EFFORT_SELECTION_LIST_QUERY
    },
    activitySelectionList: {
      query: ACTIVITY_SELECTION_LIST_QUERY
    }
  },

  methods: {
    onSuggestSelectEffort (suggest) {
      this.effort.selected = suggest
    },
    onSuggestSelectActivity (suggest) {
      this.activity.selected = suggest
    },
    filesChange (fieldName, fileList) {
      if (!fileList.length) return null

      // console.log('fileList[0] : ', fileList[0])
      Papa.parse(fileList[0], {
        delimiter: ',',
        newline: '\r\n',
        header: true,
        complete: results => {
          this.csv = results
          this.currentStatus = STATUS_SUCCESS
          console.log(results)
        }
      })
    },
    submitUpload () {
      this.$apollo.mutate({
        mutation: BULK_UPLOAD_MUTATION,
        variables: {
          events: this.eventInput,
          animals: this.animalInput
        }
      })
        .then(data => {
          console.log(data)
          this.$router.push(`/activities/${this.activity.selected.id}`)
        })
    }
  }
}
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lightcyan;
  color: dimgrey;
  padding: 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox p {
  text-align: center;
  padding: 50px;
}
/* .button-group button {
  background-color: var(--main-color);
  color: white;
  padding: 10px 24px;
  cursor: pointer;
}

.button-group button:not(:last-child) {
  border-right: none;
}

.button-group button:hover {
  background-color: rgba(104, 88, 204, .5)
} */
</style>
