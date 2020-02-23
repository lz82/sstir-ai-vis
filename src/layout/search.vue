<template>
  <div class="search-layout-wrapper">
    <header>
      <div class="header-container">
        <!-- <router-link to="/">
          <img :src="logo" alt="Logo">
        </router-link> -->
        <!-- <div class="search"> -->
          <el-input
            v-model="keyword"
            prefix-icon="el-icon-search"
            style="width:640px;"
            @keyup.enter.native="onSearch"
          >
            <el-button slot="append" @click="onSearch">Search</el-button>
          </el-input>
        <!-- </div> -->
      </div>
    </header>
    <div class="search-layout-result-wrapper">
      <transition :name="transitionName">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'SearchLayout',

  data () {
    return {
      logo: logo,
      keyword: this.$route.params.searchKey,
      transitionName: 'slide-left'
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
    },

    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },

  methods: {
    onSearch () {
      this.$router.push(`/search/result/${encodeURIComponent(this.keyword)}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';

  .search-layout-wrapper {
    min-height: 100vh;
    // background-attachment:fixed;
    background: url(./img/ball.png) no-repeat -400px 150px fixed,
                url(./img/ball.png) no-repeat right -200px bottom -100px fixed;
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
          width: 45px;
          height: 38px;
          line-height: 38px;
        }

        /deep/ .el-input-group {
          // box-shadow: 0px 24px 31.85px 3.15px rgba(45, 45, 45, 0.4);
          border-bottom-right-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        /deep/ .el-input__inner{
          position: relative;
        }
      }
    }
  }

  .search-layout-result-wrapper {
    width: @contentWidth;
    margin: 0 auto;
    padding-top: 65px;
  }
</style>
