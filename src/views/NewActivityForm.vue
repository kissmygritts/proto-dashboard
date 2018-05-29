<template>

  <form-wrapper>
    <new-activity-form-content slot="formContent" />
  </form-wrapper>

</template>

<script>
import FormWrapper from '@/components/forms/FormWrapper.vue'
import NewActivityFormContent from '@/components/forms/NewActivityFormContent.vue'

export default {
  name: 'NewActivityForm',

  components: {
    FormWrapper,
    NewActivityFormContent
  }

}
</script>

<style scoped>
</style>
