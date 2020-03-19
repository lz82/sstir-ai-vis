<template>
  <div class="report-list-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb />
    </div>

    <div class="container clearfix">
      <!-- <el-card v-for="item in list" :key="item.type" style="margin-bottom: 20px;" class="box-card">
        <div class="report-wrapper" @click="onRedirectClick(item.type)">
          <div class="report-item">
            <h2 class="title">
              {{ item.title }}
            </h2>
            <span class="more">更多<i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="content">
            <div class="word">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </el-card> -->
      <div
        v-for="item in list"
        :key="item.type"
        class="box-card"
        @click="onRedirectClick(item.type)"
      >
        <h2 class="title">
          {{ item.title }}
        </h2>
        <div class="content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportList',

  data() {
    return {
      list: [
        {
          title: '全球人工智能顶尖科研专家领域分布',
          content: '全球人工智能活跃中的顶尖科研专家在各学科领域的分布报告',
          type: 'expert-domain'
        },
        {
          title: '全球人工智能应用专家行业分布',
          content: '全球人工智能应用型专家在各行业的分布报告',
          type: 'expert-industry'
        },
        {
          title: '全球人工智能科研和研发机构分布',
          content: '全球人工智能科研和研发机构的分布报告',
          type: 'org'
        },
        {
          title: '全球人工智能TOP200科研专家',
          content: '全球人工智能排名前200的科研专家详情',
          type: 'expert-rank'
        }
      ]
    }
  },

  methods: {
    onRedirectClick(id) {
      this.$router.push({
        path: `/report/${id}`
      })
    },

    setClass(name) {
      return ['box-card', name]
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';

.report-list-wrapper {
  //  .breadcrumb {
  //    padding: 20px 0;
  //  }

  .container {
    .box-card {
      width: 100%;
      cursor: pointer;
      background: url(./img/bg1.png) no-repeat;
      background-size: cover;
      margin-bottom: 20px;
      color: #fff;
      height: 300px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      box-shadow: 0px 9px 26.88px 5.12px rgba(0, 0, 0, 0.4);
      .title {
        font-size: 24px;
        padding-bottom: 40px;
      }

      .content {
        font-size: 16px;
      }
    }
  }
}
</style>
