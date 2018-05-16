<template>
  <div class="item">
    <div class="item-head">
      <h3 class="is-capitalized">{{ item.effort_name }}</h3>
    </div>

    <div class="item-content">
      {{ item.effort_summary.slice(0, 140) }}...
    </div>

    <div class="item-footer">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="tags">
              <span class="tag" v-for="(tag, index) in item.effort_tags" :key="index">{{ tag }}</span>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span class="more-info"><i class="flaticon-more-1"></i></span>
          </div>
        </div>
      </div>

      <!-- <div class="tags">
        <span class="tag" v-for="(tag, index) in item.effort_tags" :key="index">{{ tag }}</span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: [ 'item' ]
}
</script>

<style scoped>
.item {
  border-bottom: 1px solid var(--main-grey);
  padding: 12px 16px;
  background-color: white;
  transition: all 500ms ease;
}

.item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
}

.item:hover {
  background-color: rgba(94,44,165, .1);
}

.item-head {
  margin-bottom: 12px;
}

.item-head > h3 {
  font-weight: 600;
}

.item-content {
  margin-bottom: 12px;
  /* color: grey; */
  font-weight: 300;
}

.tag {
  background-color: var(--main-color);
  color: white;
}

.more-info {
  color: var(--main-color);
}
</style>
