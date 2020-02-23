<template>
  <div class="graph-layout-wrapper">
    <header>
      <div class="header-container">
        <el-input
          v-model="keyword"
          prefix-icon="el-icon-search"
          style="width:640px;"
          @keyup.enter.native="onSearch"
        >
          <el-button slot="append" @click="onSearch">Search</el-button>
        </el-input>
      </div>
    </header>
    <div class="graph-layout-result-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'GraphLayout',

  data () {
    return {
      logo: logo,
      keyword: this.$route.params.searchKey
    }
  },

  computed: {
    routerKey () {
      return this.$route.params.searchKey
    }
  },

  watch: {
    routerKey (newVal) {
      this.keyword = newVal
    }
  },

  methods: {
    onSearch () {
      this.$router.push(`/search/result/${this.keyword}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';

  .graph-layout-wrapper {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    header {
      flex: 0 0 60px;
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

    .graph-layout-result-wrapper {
      flex: 1 1 auto;
      width: 90%;
      margin: 0 auto;
    }
  }
</style>
