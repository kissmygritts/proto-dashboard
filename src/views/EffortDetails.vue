<template>
  <div class="content-wrapper flex flex-row items-start mt3 w-90 center">

    <!-- main content panel -->
    <div id="document" class="bg-white w-70 pa3 br2">
      <h1 class="f2 mb1">{{ effortById.effort_name }}</h1>

      <div class="mt3">
        <h4 class="f4 fw5 lh-copy">Effort Description</h4>
        <p class="f5 lh-copy">1 {{ effortById.effort_purpose }}</p>
      </div>

      <div id="activities" class="mt4">
        <h4 class="f4 fw5 lh-copy">Activities</h4>

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
    </div>

    <!-- side panel -->
    <div id="metadata-wrapper" class="pl4 w-30">

      <!-- metadata panel -->
      <div id="metadata" class="mb2">
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
      return this.effortById.activities.length !== 0
    }
  },

  apollo: {
    effortById: {
      query: EFFORT_BY_ID_QUERY,
      variables () {
        return {
          effortId: this.effortId
        }
      }
    }
  }
}
</script>

<style>

</style>
