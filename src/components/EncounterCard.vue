<template>
  <div class="encounter-card bg-white cf flex flex-row justify-between pv1 ph2 mb1 br2">
    <!-- left side of card -->
    <div class="card-left w-25">
      <div class="ndow-id f3 fw6 mb2 main">{{ encounter.ind_id }}</div>
      <div class="dates gray">
        <div class="year">2018</div>
        <div class="date">Jan 01</div>
      </div>
    </div>

    <!-- right side of card -->
    <div class="card-right w-75">

      <!-- top right -->
      <div class="right-top lh-title">
        <div class="species tr f5 fw5 main">{{ encounter.common_name }}</div>
        <div class="activity tr f5 fw2">{{ encounter.activity_name }}</div>
      </div>

      <!-- bottom left -->
      <div class="right-bottom gray">
        <div class="metric">
          <div class="field-name bb b--light-silver">sex</div>
          <div class="field-data">{{ encounter.sex }}</div>
        </div>
        <div class="metric">
          <div class="field-name bb b--light-silver">age</div>
          <div class="field-data">{{ encounter.age }}</div>
        </div>
        <div class="metric">
          <div class="field-name bb b--light-silver">status</div>
          <div class="field-data">{{ encounter.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EncounterCard',
  props: [ 'encounter' ]
}
</script>

<style scoped>
.encounter-card {
  min-height: 95px;
  transition: all 500ms ease;
}

/* .encounter-card:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.encounter-card:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
} */

.encounter-card:hover {
  background-color: rgba(105,88,208, .05);
}

.card-left {
  box-shadow: 10px 0px 3px -10px #999999;
}

.year {
  font-size: 1.125em;
  letter-spacing: .15em;
  font-weight: 600;
}

.date {
  font-size: .875em;
  letter-spacing: .1em;
}

.card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right-bottom {
  display: flex;
  justify-content: space-around;
}

.metric {
  /* color: #bababa; */
  font-size: .75em;
  letter-spacing: .08em;
  text-align: center;
}

.field-name {
  text-transform: uppercase;
  /* border-bottom: 1px solid #bababa; */
  padding-bottom: 2px;
}

.field-data {
  text-transform: capitalize;
  padding-top: 2px;
}
</style>
