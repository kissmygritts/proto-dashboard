<template>
  <div class="form-wrapper">
    <form>

      <div class="message is-info">
        <p class="message-body">
          Use this form to enter new Efforts. What is an effort, you ask?
          An effort can be thought of as a project. It is a coordinated, action
          undertaken by NDOW or one of our collaborators. For instance, Big Horn
          Sheep captures fall into a single effort.
        </p>
      </div>

      <div class="field">
        <label for="effort_name" class="label">Effort Name</label>
        <div class="control">
          <input
            type="text"
            class="input"
            name="effort_name"
            v-model="effort_name"
          >
        </div>
      </div>

      <div class="field">
        <label for="effort_status" class="label">Effort Status</label>
        <div class="control">
          <input
            type="text"
            class="input"
            name="effort_status"
            v-model="effort_status"
          >
        </div>
      </div>

      <div class="field">
        <label for="effort_status" class="label">Effort Agency</label>
        <div class="control">
          <input
            type="text"
            class="input"
            name="effort_agency"
            v-model="effort_agency"
          >
        </div>
      </div>

      <div class="field">
        <label for="effort_purpose" class="label">Effort Purpose</label>
        <div class="control">
          <textarea
            name="effort_purpose"
            class="textarea"
            v-model="effort_purpose"
          ></textarea>
        </div>
      </div>

      <button class="button">Submit</button>

      <hr>
      <div>
        <pre><code>{{ $data }}</code></pre>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'NewEffort',

  data () {
    return {
      effort_name: null,
      effort_status: null,
      effort_agency: null,
      effort_purpose: null
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  /* background-color: white; */
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 66%;
  background-color: white;
  padding: 16px 72px;
  border-radius: 2px;
}
</style>
