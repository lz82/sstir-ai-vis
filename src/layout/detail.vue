<template>
  <div class="detail-layout-wrapper">
    <header>
      <div class="header-container">
        <router-link to="/">
          <img :src="logo" alt="Logo">
        </router-link>
        <el-input
          v-model="keyword"
          prefix-icon="el-icon-search"
          style="width:800px;"

        >
          <el-button slot="append" @click="onSearch">Search</el-button>
        </el-input>
      </div>
    </header>
    <div class="detail-layout-result-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'DetailLayout',

  data () {
    return {
      logo: logo,
      keyword: ''
    }
  },

  methods: {
    onSearch () {

    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';

  .detail-layout-wrapper {
    header {
      position: fixed;
      width: 100%;
      line-height: 60px;
      background: @bgColor;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      z-index: 999;
      .header-container {
        width: @contentWidth;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        img {
          margin-right: 20px;
        }
         /deep/ .el-input-group--append .el-input__inner, .el-input-group__prepend {
          border-width: 0px;
        }

        /deep/ .el-input-group__append {
          border-width: 0px;
          color: #fff;
          background-color: #000;
        }

        /deep/ .el-input-group {
          // box-shadow: 0px 24px 31.85px 3.15px rgba(45, 45, 45, 0.4);
          border-bottom-right-radius: 5px;
        }
      }
    }
  }

  .detail-layout-result-wrapper {
    width: @contentWidth;
    margin: 0 auto;
    padding-top: 60px;
  }
</style>
