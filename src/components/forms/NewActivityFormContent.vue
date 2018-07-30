<template>
  <div>
    <div id="form-message" class="pa3 br1 bg-lightest-blue mb3">
      <p class="mid-gray">
        Use this form to enter new Activities. What is an activity, you ask?
        An activity is an way to organize data collection events. They are
        children of efforts (each activity must have an effort). An example
        of an activity is a single capture (2017 Bare Mountains DBHS), or a
        single transect of a survey.
      </p>
    </div>

    <div id="form-fields">
      <form>
        <!-- field -->
        <div class="mb3">
          <label for="effort-name" class="f6 b db mb1">Effort Name</label>
          <vue-simple-suggest
            mode="input"
            v-model="model"
            :list="effortSelectionList"
            :filter-by-query="true"
            value-attribute="id"
            display-attribute="effort_name"
            @select="onSuggestSelect"
          ></vue-simple-suggest>
        </div>
        <!-- field -->
        <div class="mb3">
          <label for="activity-name" class="f6 b db mb1">Activity Name</label>
          <input
            name="activity-name"
            type="text"
            class="input-reset ba b--black-20 pa2 db br1 w-100"
            v-model="input.activity_name"
          >
        </div>
        <!-- field -->
        <div class="mb3">
          <label for="activity-type" class="f6 b db mb1">Activity Type</label>
          <input
            name="activity-type"
            type="text"
            class="input-reset ba b--black-20 pa2 db br1 w-100"
            v-model="input.activity_type"
          >
        </div>
        <!-- field -->
        <div class="mb3">
          <label for="activity-start-date" class="f6 b db mb1">Activity Start Date</label>
          <input
            name="activity-start-date"
            type="text"
            class="input-reset ba b--black-20 pa2 db br1 w-100"
            v-model="input.activity_start_date"
            placeholder="yyyy-mm-dd"
          >
        </div>
        <!-- field -->
        <div class="mb3">
          <label for="activity-duration" class="f6 b db mb1">Activity Duration</label>
          <input
            name="activity-duration"
            type="text"
            class="input-reset ba b--black-20 pa2 db br1 w-100"
            v-model="input.activity_duration"
          >
        </div>
        <!-- field -->
        <div class="mb3">
          <label for="activity-type" class="f6 b db mb1">Activity Time Frame</label>
          <input
            name="activity-time-frame"
            type="text"
            class="input-reset ba b--black-20 pa2 db br1 w-100"
            v-model="input.activity_time_frame"
          >
        </div>
        <!-- field -->
        <div class="mb3">
          <label for="activity-description" class="f6 b db mb1">Activity Description</label>
          <textarea
            name="activity-description"
            rows="5"
            class="db border-box hover-black w-100 ba b--black-20 pa2 br1"
            v-model="input.activity_description"
          ></textarea>
        </div>

        <button @click="submitForm" class="f6 link dim br2 pv2 mb2 dib purple bg-white b--purple">Submit Activity</button>

        <hr>

        <pre><code>{{ input }}</code></pre>

      </form>
    </div>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'
import { EFFORT_SELECTION_LIST_QUERY } from '../../graphql/Effort_SelectionListQuery'
// import { ALL_ACTIVITIES_QUERY } from '../../graphql/Activity_AllQuery'
import { CREATE_ACTIVITY_MUTATION } from '../../graphql/Activity_CreateMutation'

export default {
  name: 'NewActivityFormContents',

  components: { VueSimpleSuggest },

  data () {
    return {
      model: null,
      selected: null,
      effortSelectionList: [],
      input: {
        effort_id: null,
        activity_name: null,
        activity_type: null,
        activity_start_date: null,
        activity_duration: null,
        activity_time_frame: null,
        activity_description: null
      }
    }
  },

  apollo: {
    effortSelectionList: {
      query: EFFORT_SELECTION_LIST_QUERY
    }
  },

  methods: {
    onSuggestSelect (suggest) {
      this.selected = suggest
      this.input.effort_id = suggest.id
    },

    submitForm () {
      let newInput = this.input

      this.$apollo.mutate({
        mutation: CREATE_ACTIVITY_MUTATION,
        variables: {
          input: newInput
        }
        // update: (store, { data: { createActivity } }) => {
        //   const data = store.readQuery({ query: ALL_ACTIVITIES_QUERY })
        //   data.activities.push(createActivity)
        //   store.writeQuery({ query: ALL_ACTIVITIES_QUERY, data })
        // },
        // optimisticResponse: {
        //   __typeName: 'Mutation',
        //   createActivity: {
        //     __typename: 'Activity',
        //     id: -1,
        //     ...newInput
        //   }
        // }
      })
        .then(data => {
          console.log(data)
          this.$router.push(`/efforts/${this.input.effort_id}`)
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style>
.vue-simple-suggest.designed .input-wrapper input {
  border-color: rgba(0, 0, 0, .2);
  transition-property: none;
}

.vue-simple-suggest.focus .input-wrapper input {
  outline: 5px auto #5b9dd9;
}

.vue-simple-suggest.designed .suggestions {
  background-color: #f4f4f4;
}
</style>
