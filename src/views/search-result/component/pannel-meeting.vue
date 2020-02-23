<template>
  <div class="meeting-pannel-wrapper">
    <h3>Recommendation of Core Conferences and Journals</h3>
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MeetingPannel',

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
  .meeting-pannel-wrapper {
    padding-top: 30px;
    h3 {
      font-size: 14px;
      font-weight: 500;
    }
    ul {
      padding-top: 25px;
      display: flex;
      flex-flow: row wrap;
      li {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        margin-right: 20px;
        line-height: 24px;
      }
    }
  }
</style>
