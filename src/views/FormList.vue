<template>
  <div class="content-wrapper flex flex-column mv3 w-100 ph4 items-center">
    <div class="form-item w-50 bg-white">
      <ul class="list pl0">
        <li class="pa3 pa4-ns bb b--black-10">
          <router-link class="db f3 mb1 main fw5 dim" to="/forms/new-effort">
            Create Effort
          </router-link>
          <span class="f5 db lh-copy measure">
            Use this form to submit a new effort to the database. Once an effort is
            entered you can submit activities for that effort to the database.
          </span>
        </li>
        <li class="pa3 pa4-ns bb b--black-10">
          <router-link class="db f3 mb1 main fw5 dim" to="/forms/new-activity">
            Create Activity
          </router-link>
          <span class="f5 db lh-copy measure">
            Use this form to submit a new activity to the database. An activity must
            have an effort already in the database in order to successfully submit
            an activity. Once an activity is entered, you can submit animal data.
          </span>
        </li>
        <li class="pa3 pa4-ns bb b--black-10">
          <router-link class="db f3 mb1 main fw5 dim" to="/forms/data-entry">
            Upload Animal Data
          </router-link>
          <span class="f5 db lh-copy measure">
            This form accepts CSV files of animal data, then uploads it to the database.
            Animal data must have activity data already in the database to successfully
            enter into the database.
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormList'
}
</script>

<style>

</style>
