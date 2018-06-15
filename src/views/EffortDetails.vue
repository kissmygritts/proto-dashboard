<template>
  <div class="content-wrapper flex flex-row items-start mv3 w-100 ph4 center">

    <!-- main content panel -->
    <div id="document" class="bg-white w-70 pa3 br2">
      <h1 class="f2 lh-title ttc mb2">{{ effortById.effort_name }}</h1>

      <div id="action-buttons">
        <a @click="goBack" class="f6 link br2 ba ph3 pv2 dib blue mr2 bg-animate hover-bg-blue hover-white">Back</a>
        <router-link to="/forms/new-activity" class="f6 link br2 ba ph3 pv2 dib main mr2 bg-animate hover-bg-main hover-white">Add Activiy</router-link>
        <a id="delete-button" class="f6 link br2 ba ph3 pv2 dib orange mr2 bg-animate hover-bg-orange hover-white">Update Effort</a>
        <a id="delete-button" class="f6 link br2 ba ph3 pv2 dib red mr2 bg-animate hover-bg-red hover-white">Delete Effort</a>
      </div>

      <h2 class="f3 lh-title mt3 mb2">Effort Description</h2>
      <p class="f5 lh-copy ph2">{{ effortById.effort_purpose }}</p>

      <h2 class="f3 lh-title mt3 mb2">Activities Table</h2>
      <p class="f5 lh-copy ph2">
        All the activities for this effort are displayed in the table below.
        This is short summary of the data. For more information about an
        individual activity click the activity name.
      </p>

      <div id="activity-table" class="mt3">
        <table class="f6 w-100 mw8 center">
            <thead>
              <tr>
                <th class="fw6 bb bb-black-20 tl pb3 pr3 bg-white">Activity Name</th>
                <th class="fw6 bb bb-black-20 tl pb3 pr3 bg-white">Start Date</th>
                <th class="fw6 bb bb-black-20 tl pb3 pr3 bg-white">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!hasActivities">
                  <td class="tc pv3 pr3 bb b--black-20" colspan="3">This effort doesn't have any activities yet <span class="f5">&#x1F61E;</span></td>
              </tr>
              <tr v-else v-for="(activity, index) in effortById.activities" :key="index">
                <td class="pv3 pr3 bb b--black-20">
                  <router-link
                    :to="{ name: 'activity', params: { id: activity.id } }"
                  >
                    {{ activity.activity_name }}
                  </router-link>
                </td>
                <td class="pv3 pr3 bb b--black-20">{{ activity.activity_start_date }}</td>
                <td class="pv3 pr3 bb b--black-20">{{ activity.activity_duration }} {{ activity.activity_time_frame }}</td>
              </tr>
            </tbody>
          </table>
      </div>

    </div>

    <!-- side panel -->
    <div id="metadata-wrapper" class="w-30 ml3 mid-gray">

      <!-- metadata panel -->
      <div id="metadata">

        <ul class="list pl0 ml0 center">
          <li class="pa1 main">
            Effort Metadata
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Agency</dd>
              <dd class="f5 fw4 ml0">{{ effortById.effort_agency }}</dd>
            </dl>
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Status</dd>
              <dd class="f5 fw4 ml0">{{ effortById.effort_status }}</dd>
            </dl>
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Created At</dd>
              <dd class="f5 fw4 ml0">{{ effortById.created_at }}</dd>
            </dl>
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Updated At</dd>
              <dd class="f5 fw4 ml0">{{ effortById.updated_at }}</dd>
            </dl>
          </li>
          <li class="pa2">
            <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
              <dd class="mb1 f6 fw6 ml0">Effort ID</dd>
              <dd class="f7 fw4 ml0">{{ effortById.id }}</dd>
            </dl>
          </li>
        </ul>

      </div>
      <!-- related content panel -->
      <!-- <div id="related-data" class="bg-white ba pa1">
        related data
      </div> -->
    </div>
  </div>
</template>

<script>
import { EFFORT_BY_ID_QUERY } from '../graphql/Effort_ByIdQuery'

export default {
  name: 'EffortDetails',

  data () {
    return {
      effortId: this.$route.params.id,
      effort: null,
      effortById: ''
    }
  },

  computed: {
    hasActivities () {
      if (this.effortById) {
        return this.effortById.activities.length !== 0
      }
    }
  },

  apollo: {
    effortById: {
      query: EFFORT_BY_ID_QUERY,
      variables () {
        return {
          effortId: this.effortId
        }
      },
      fetchPolicy: 'network-only'
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
#delete-button {
  cursor: not-allowed;
}
</style>
