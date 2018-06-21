<template>
  <div>
    <!-- form message -->
    <p class="mid-gray pa3 br1 bg-lightest-blue mb3">
      This form will walk you through the data entry workflow. You Follow the steps as outlined below.
    </p>

    <div class="w-100">
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
    </div>

    <form id="upload-button" enctype="multipart/form-data" class="mb3">
      <input type="file" id="upload" name="upload" class="inputfile" @change="filesChange" accept=".csv" multiple>
      <label for="upload" class="f6 link br2 ba pv2 ph3 dip blue bg-white b--blue">Choose a file</label>
    </form>

    <div id="uploads" v-if="isSuccess">
      <span
        class="f6 br1 ba pv1 ph2 bg-green white b--green dib mr2"
        v-for="(name, index) in this.files.itemsNames"
        :key="index"
      >
        {{ name }}
      </span>
    </div>

    <!-- csv data -->
    <div v-if="manyCsv.encounter" class="mt3">

      <p class="mid-gray pa3 br1 bg-washed-green mb3">
        Below are the contents of the uploaded .CSV file.
      </p>

      <p v-if="hasPapaParseError" class="mid-gray pa3 br1 bg-washed-red mb3">
        There was an error parsing your CSV file. Please double check your file for errors.
        Below is an explanation of the error. See <a href="https://github.com/kissmygritts/proto-dashboard/issues/7">this page</a>
        for an explanation of common errors.

        <pre class="bg-washed-red dark-red"><code>{{ manyCsv.encounter.errors }}</code></pre>
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
            <tr v-for="(row, index) in manyCsv.encounter.data" :key="index">
              <td v-for="(field, index) in displayFields" :key="index" class="pv3 pr3 bb b--black-20">{{ row[field.prop] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <button type="button" @click="submitUpload" class="f6 link dim br2 ba pv2 mb2 dib purple bg-white b--purple">Upload CSV</button>

    <!-- <pre><code>{{ marksInput }}</code></pre> -->
    <!-- <pre><code>{{ ids }}</code></pre> -->
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
      ],
      files: {
        items: [],
        itemsAdded: '',
        itemsNames: [],
        itemsSizes: [],
        formData: '',
        successMsg: '',
        errorMsg: '',
        fileList: null
      },
      manyCsv: []
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
      if (this.manyCsv.encounter) {
        return this.manyCsv.encounter.errors.length > 0
      }
    },
    eventInput () {
      const encounter = this.manyCsv.encounter

      if (encounter) {
        return encounter.data.map((m, i) => ({
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
      const encounter = this.manyCsv.encounter

      if (encounter) {
        return encounter.data.map((m, i) => {
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
    labidInput () {
      const encounter = this.manyCsv.encounter

      if (encounter) {
        return encounter.data.map((m, i) => {
          return ({
            animal_id: this.ids[i].animal,
            labid: m.labid.toLowerCase()
          })
        })
      }
    },
    biometricInput () {
      const biometric = this.manyCsv.biometric

      if (biometric) {
        return biometric.data.map(m => {
          let id = this.ids.filter(f => f.indId === m.ind_id)
          return {
            animal_id: id[0].animal,
            measurement: m.measurement,
            val: parseFloat(m.val) || null,
            units: m.units,
            notes: m.notes
          }
        })
      }
    },
    marksInput () {
      const marks = this.manyCsv.marks

      if (this.manyCsv.encounter && marks) {
        return marks.data.map(m => {
          let id = this.ids.filter(f => f.indId === m.ndowId)
          let markId = v4()
          return {
            id: markId,
            animal_id: id[0].animal,
            mark_type: m.mark_type,
            mark_id: m.mark_id,
            mark_color: m.mark_color,
            mark_location: m.mark_location,
            date_given: formatTimestamp(m.date_given, '', 'YYYY-MM-DD')
          }
        })
      }
    },
    ids () {
      const encounter = this.manyCsv.encounter
      if (encounter) {
        return Array.apply(null, Array(encounter.data.length)).map((m, i) => ({
          event: v4(),
          animal: v4(),
          indId: encounter.data[i].ind_id
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
    filesChange (e) {
      let files = e.target.files || e.dataTransfer.files

      this.files.successMsg = ''
      this.files.errorMsg = ''
      this.files.formData = new FormData()
      this.files.itemsAdded = files.length
      this.files.fileList = files

      for (let x in files) {
        if (!isNaN(x)) {
          let name = files[x].name
          let nameNoExt = name.slice(0, name.indexOf('.'))
          this.files.itemsNames[x] = name

          Papa.parse(files[x], {
            delimiter: ',',
            newline: '\r\n',
            header: true,
            skipEmptyLines: true,
            complete: results => {
              this.currentStatus = STATUS_SAVING
              this.manyCsv = { ...this.manyCsv, [nameNoExt]: results }
            }
          })
        }
      }

      this.currentStatus = this.files.itemsNames.length > 0 ? STATUS_SUCCESS : STATUS_FAILED
    },
    submitUpload () {
      this.$apollo.mutate({
        mutation: BULK_UPLOAD_MUTATION,
        variables: {
          events: this.eventInput,
          animals: this.animalInput,
          labids: this.labidInput,
          marks: this.marksInput,
          biometrics: this.biometricInput
        }
      })
        .then(data => {
          console.log(data)
          // this.$router.push(`/activities/${this.activity.selected.id}`)
        })
    }
  }
}
</script>

<style scoped>
.inputfile {
  width: .1px;
  height: .1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

/* .inputfile + label {
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
}

.inputfile:focus + label,
.inputfile + label:hover {
  background-color: red;
}

.inputfile + label {
  cursor: pointer;
}

.inputfile:focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
} */
</style>
