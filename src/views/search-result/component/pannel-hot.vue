<template>
  <div class="hot-pannel-wrapper">
    <h3>Hot Words Recommendation</h3>
    <ul>
      <li v-for="item in list1" :key="item" @click="goSearch(item)">{{item}}</li>
    </ul>
    <ul>
      <li v-for="item in list2" :key="item" @click="goSearch(item)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HotPannel',

  data () {
    return {
      list1: ['Neural network', 'Machine Learning', 'Support Vector Machines', 'Face recognition', 'Pattern recognition', 'Deep learning', 'Convolutional neural network', 'Artificial Intelligence', 'Computer Vision', 'Natural Language Processing'],
      list2: ['Andrew Ng', 'Zhi-Hua Zhou', 'Jiawei Han', 'Geoffrey Hinton', 'Yoshua Bengio', 'Yann Lecun', 'Michael I. Jordan', 'tieniu Tan', 'Fei-Fei Li', 'Sebastian Thrun']
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

  .hot-pannel-wrapper {
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
        cursor: pointer;
        // padding-bottom: 1px !important;
        // border-bottom-style: solid;
        // border-bottom-width: 1px;
        // border-bottom-color: @borderColor;
      }
    }
  }
</style>
