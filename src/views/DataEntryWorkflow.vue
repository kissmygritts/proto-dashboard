<template>

  <form-wrapper>
    <data-entry slot="formContent" />
  </form-wrapper>

</template>

<script>
import FormWrapper from '@/components/forms/FormWrapper'
import DataEntry from '@/components/forms/DataEntry'

export default {
  name: 'DataEntryWorkflow',
  components: {
    FormWrapper,
    DataEntry
  }
}
</script>

<style>

</style>
