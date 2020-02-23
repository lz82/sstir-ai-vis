<template>
  <div class="tech-pannel-wrapper">
    <h3>Relevant Technical Recommendations</h3>
    <ul>
      <li v-for="item in list" :key="item" @click="goSearch(item)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TechPannel',

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  methods: {
    goSearch (keyword) {
      this.$router.push(`/search/result/${keyword}`)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

  .tech-pannel-wrapper {
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
        cursor: pointer;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        margin-right: 20px;
        margin-bottom: 20px;
        padding-bottom: 5px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: @borderColor;
      }
    }
  }
</style>
