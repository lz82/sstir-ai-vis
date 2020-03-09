<template>
  <div class="homepage2-wrapper">
    <div class="search-container">
      <img src="./img/logo.png" />
      <h3>{{ title }}</h3>
      <!-- <div class="search">
        <el-input
          v-model="keyword"
          prefix-icon="el-icon-search"
          style="width:550px;"
          placeholder="E.g. Machine learning; Virtual reality; David Tao"
          @keyup.enter.native="onSearch"
        >
          <el-button slot="append" @click="onSearch">Search</el-button>
        </el-input>
      </div> -->
    </div>
    <div class="tag-content">
      <tag-cloud :container-width="750" :tags="tags" />
    </div>
    <!-- <div slot="reference" class="intro-link">
      <p @click="onHelpClick"><i class="el-icon-user"></i></p>
      <p @click="onServiceClick"><i class="iconfont icontermsofservice"></i></p>
    </div> -->
  </div>
</template>

<script>
import TagCloud from './tag-cloud'

import tagDomain from './img/ball_domain.png' // 领域专家
import tagIndustry from './img/ball_industry.png' // 行业专家
import tagOrg from './img/ball_org.png' // 机构
import tagRank from './img/ball_rank.png' // 排行

export default {
  name: 'Homepage2',

  components: {
    TagCloud
  },

  data() {
    return {
      title: '世界重点地区人工智能领域资源可视化分析',
      tags: [
        {
          // 领域专家
          img: tagDomain,
          url: '/report/expert-domain'
        },
        {
          // 行业专家
          img: tagIndustry,
          url: '/report/expert-industry'
        },
        {
          // 机构
          img: tagOrg,
          url: '/report/org'
        },
        {
          // 排行
          img: tagRank,
          url: '/report/expert-rank'
        }
      ],
      keyword: ''
    }
  },
  methods: {
    onHelpClick() {
      const routeData = this.$router.resolve({
        path: '/help'
      })
      window.open(routeData.href, '_blank')
    },
    onServiceClick() {
      const routeData = this.$router.resolve({
          path: '/policy'
        })
        window.open(routeData.href, '_blank')
    },
    onSearch() {
      if (this.keyword) {
        this.$router.push(`search/result/${encodeURIComponent(this.keyword)}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.homepage2-wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: 100vh;
  background: url(./img/bg_item.png) no-repeat center center, url(./img/bg_color.png) 100% 100%;
  background-size: contain, cover;
  .search-container {
    height: 180px;
    flex: 0 0 auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    // padding-top: 20px;
    h3 {
      font-size: 24px;
      letter-spacing: 3px;
      padding-top: 16px;
      padding-bottom: 16px;
      color: #fff;
    }

    .search {
      /deep/ .el-input-group--append .el-input__inner,
      .el-input-group__prepend {
        border-width: 0px;
      }

      /deep/ .el-input-group__append {
        color: #fff;
        background-color: #061826;
      }

      /deep/ .el-input-group {
        box-shadow: 0px 24px 31.85px 3.15px rgba(45, 45, 45, 0.4);
        border-bottom-right-radius: 5px;
      }
    }
  }
  .tag-content {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    // background: url(./img/bg_tag_cloud.png) no-repeat center 106%;
    // background-size:750px 567px;
    .tag-cloud-wrapper {
      background: url(./img/star.gif) no-repeat 36.5% 2.5%,
        url(./img/star.gif) no-repeat 30.5% 27.5%, url(./img/star.gif) no-repeat 60% 1.5%,
        url(./img/star.gif) no-repeat 53% 37%, url(./img/star.gif) no-repeat 55% 53.5%,
        url(./img/star.gif) no-repeat 7% 30.5%, url(./img/star.gif) no-repeat 10.5% 56%,
        url(./img/star.gif) no-repeat 83% 33%, url(./img/star.gif) no-repeat 96% 56%,
        url(./img/star.gif) no-repeat 52% 82%, url(./img/star.gif) no-repeat 61% 96%;
      background-size: 2% 2%, 1.5% 1.5%, 2% 2%, 2% 2%, 2% 2%, 2% 2%, 2% 2%, 2% 2%, 2% 2%, 1.5% 1.5%,
        1.5% 1.5%;
    }
  }
  .tag-cloud-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .intro-link {
    position: fixed;
    right: 30px;
    bottom: 50px;
    cursor: pointer;
    p{
      margin-bottom:15px;
      i {
        font-size: 30px;
        color: rgba(255, 255, 255, 0.4);
        &:hover {
          color: #2477f5;
        }
      }
      .icontermsofservice{
        position: relative;
        left: 4px;
      }
    }
  }
}
@media screen and (max-height: 768px) {
  .search-container {
    padding-top: 40px;
  }
}
</style>
<style lang='less'>
  .user-help{
    p{
      line-height: 24px;
      cursor: pointer;
      &:hover{
        color: #2477f5;
      }
      i{
        font-size: 18px;
        padding-right: 10px;
      }
    }
  }
</style>
