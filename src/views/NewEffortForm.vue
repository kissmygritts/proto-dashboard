<template>

  <form-wrapper>
    <new-effort-form-content slot="formContent" />
  </form-wrapper>

</template>

<script>
import FormWrapper from '@/components/forms/FormWrapper.vue'
import NewEffortFormContent from '@/components/forms/NewEffortFormContent.vue'

export default {
  name: 'NewEffortForm',

  components: {
    NewEffortFormContent,
    FormWrapper
  }
}
</script>

<style scoped>
</style>
