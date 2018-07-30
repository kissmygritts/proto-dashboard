<template>
  <div>
    <div id="form-message" class="pa3 br1 bg-lightest-blue mb3">
      <p class="mid-gray">
        Use this form to enter new Efforts. What is an effort, you ask?
        An effort can be thought of as a project. It is a coordinated, action
        undertaken by NDOW or one of our collaborators. For instance, Big Horn
        Sheep captures fall into a single effort.
      </p>
    </div>

    <div id="form-fields">
      <form class="w-100">
        <!-- field -->
        <div class="w-100 mb3">
          <label for="effort-name" class="f6 b db mb1">Effort Name</label>
          <input
            name="effort-name"
            type="text"
            class="input-reset ba b--black-20 pa2 db w-100 br1"
            v-model="input.effort_name"
          >
          <!-- <small class="f6 black-60 db mb2">Name of the effort</small> -->
        </div>

        <!-- field -->
        <div class="w-100 mb3">
          <label for="effort-status" class="f6 b db mb1">Effort Status</label>
          <input
            name="effort-name"
            type="text"
            class="input-reset ba b--black-20 pa2 db w-100 br1"
            v-model="input.effort_status"
          >
          <!-- <small class="f6 black-60 db mb2">Name of the effort</small> -->
        </div>

        <!-- field -->
        <div class="w-100 mb3">
          <label for="effort-agency" class="f6 b db mb1">Effort Agency</label>
          <input
            name="effort-name"
            type="text"
            class="ba b--black-20 pa2 db w-100 br1"
            v-model="input.effort_agency"
          >
          <!-- <small class="f6 black-60 db mb2">Name of the effort</small> -->
        </div>

        <!-- field -->
        <div class="w-100 mb3">
          <label for="effort-description" class="f6 b db mb1">Description</label>
          <textarea
            name="effort-description"
            rows="5"
            class="db border-box hover-black w-100 ba b--black-20 pa2 br1"
            v-model="input.effort_purpose"
          ></textarea>
          <!-- <small class="f6 black-60 db mb2">Name of the effort</small> -->
        </div>

        <button type="button" @click="submitEffort" class="f6 link dim br2 ba pv2 mb2 dib purple bg-white b--purple">Submit Effort</button>

        <hr>

        <pre><code>{{ input }}</code></pre>

      </form>
    </div>
  </div>
</template>

<script>
import { CREATE_EFFORT_MUTATION } from '../../graphql/Effort_CreateMutation'
import { ALL_EFFORTS_QUERY } from '../../graphql/Effort_AllQuery'

export default {
  name: 'NewEffortFormContent',

  data () {
    return {
      input: {
        effort_name: null,
        effort_status: null,
        effort_agency: null,
        effort_purpose: null,
        effort_primary_species: ''
      }
    }
  },

  methods: {
    submitEffort () {
      const newInput = this.input

      this.$apollo.mutate({
        mutation: CREATE_EFFORT_MUTATION,
        variables: {
          input: newInput
        },
        update: (store, { data: { createEffort } }) => {
          const data = store.readQuery({ query: ALL_EFFORTS_QUERY })
          data.efforts.push(createEffort)
          store.writeQuery({ query: ALL_EFFORTS_QUERY, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createEffort: {
            __typename: 'Effort',
            id: -1,
            ...newInput
          }
        }
      })
        .then(data => {
          // console.log(data)
          this.$router.push('/efforts')
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>

</style>
