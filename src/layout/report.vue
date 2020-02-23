<template>
  <div class="report-layout-wrapper">
    <div class="report-layout-result-wrapper">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReportLayout',

  data () {
    return {
      transitionName: 'slide-left'
    }
  },

  watch: {
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';

  .report-layout-wrapper {
    width: 100%;
    min-height: 100vh;
    // background-attachment:fixed;
    // background: url(./img/ball.png) no-repeat -400px 150px fixed,
    //             url(./img/ball.png) no-repeat right -200px bottom -100px fixed;
    // background-color: #f6f6f6;
    background: url(./img/report-bg.jpg) no-repeat;
    background-size: cover;
    background-attachment: fixed;

    header {
      position: fixed;
      width: 100%;
      line-height: 60px;
      background: @bgColor;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      z-index: 999;
      background: url('./img/bg.png') center center repeat-x;
      .header-container {
        width: @contentWidth;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        height: 65px;
        img {
          margin-right: 20px;
        }
         /deep/ .el-input-group--append .el-input__inner, .el-input-group__prepend {
          border-width: 0px;
        }

        /deep/ .el-input-group__append {
          // border-width: 0px;
          color: #fff;
          background-color: #343c4e;
        }

        /deep/ .el-input-group {
          // box-shadow: 0px 24px 31.85px 3.15px rgba(45, 45, 45, 0.4);
          border-bottom-right-radius: 5px;
        }
      }
    }
  }

  .report-layout-result-wrapper {
    width: @contentWidth;
    margin: 0 auto;
    // padding-top: 60px;
  }
</style>
