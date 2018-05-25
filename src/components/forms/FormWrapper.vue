<template>

  <section class="pa3">
    <div class="ph6 pr6">
      <div id="form-content" class="bg-white pa4 br2">
        <slot name="formContent"></slot>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: 'FormWrapper'
}
</script>

<style>

</style>
