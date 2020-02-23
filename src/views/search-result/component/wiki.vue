<template>
  <div class="wiki-wrapper">
    <div class="content">
       <h3>{{ title }}({{titleE}})</h3>
        <p class="desc">
          {{ desc }}
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wiki',

  props: {
    title: {
      type: String
    },
    titleE: {
      type: String
    },
    desc: {
      type: String
    }
  },

  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';
  .wiki-wrapper {
    background: #fff;
    border: solid 1px @borderColor;
    border-radius: 5px;
    padding: 28px 0 0 15px;
    .content {
       h3 {
        font-size: 20px;
        color: #000;
      }
      .desc {
        padding: 25px 8px 15px 0;
        line-height: 24px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
</style>
