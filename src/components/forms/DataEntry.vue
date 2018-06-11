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

    <hr>

    <!-- csv data -->
    <div v-if="isSuccess">

      <p class="mid-gray pa3 br1 bg-washed-green mb3">
        Below are the contents of the uploaded .CSV file.
      </p>

      <!-- table of csv -->
      <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>
              <th v-for="(field, index) in csv.meta.fields" :key="index" class="fw6 bb b--black-20 tl pr3 bg-white">{{ field }}</th>
            </tr>
          </thead>
          <tbody class="lh-copy">
            <tr v-for="(row, index) in csv.data" :key="index">
              <td v-for="(field, index) in csv.meta.fields" :key="index" class="pv3 pr3 bb b--black-20">{{ row[field] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <hr>

    <pre><code>{{ eventInput }}</code></pre>
    <pre><code>{{ activityInput }}</code></pre>
  </div>
</template>

<script>
import format from 'date-fns/format'
import VueSimpleSuggest from 'vue-simple-suggest'
import Papa from 'papaparse'
import { v4 } from 'uuid'
import { EFFORT_SELECTION_LIST_QUERY } from '../../graphql/Effort_SelectionListQuery'
import { ACTIVITY_SELECTION_LIST_QUERY } from '../../graphql/Activity_SelectionListQuery'

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
      csv: null
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
        return this.csv.data.map(m => ({
          // id: this.eventId,
          activity_id: this.activity.selected.id,
          event_date: format(new Date(m.date), 'YYYY-MM-DD'),
          event_time: format(new Date(`${m.date} ${m.start_time}`), 'HH:mm:SSZ'),
          event_type: m.event_type,
          x: parseFloat(m.x),
          y: parseFloat(m.y),
          datum: m.datum,
          source_app: 'gus upload template'
        }))
      }
    },
    activityInput () {
      if (this.csv) {
        return this.csv.data.map(m => ({
          // id: this.animalId,
          event_id: '0e6f8254-7484-45d5-a73f-16ddbfcfb10b',
          species_id: m.species,
          ind_id: parseInt(m.ind_id),
          sex: m.sex,
          age_class: m.age_class,
          n: parseInt(m.count),
          animal_status: m.status,
          reencounter: m.reencounter === 'TRUE',
          observer: m.observer,
          comments: m.comments
        }))
      }
    },
    eventId () {
      return v4()
    },
    animalId () {
      return v4()
    },
    startTimes () {
      if (this.csv) {
        return this.csv.data.map(m => format(new Date(`${m.date} ${m.start_time}`), 'HH:mm:SSZ'))
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
        newline: '\n',
        header: true,
        complete: results => {
          this.csv = results
          this.currentStatus = STATUS_SUCCESS
          console.log(results)
        }
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
