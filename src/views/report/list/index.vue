<template>
  <div class="report-list-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb />
    </div>

    <div class="container clearfix">
      <el-card v-for="item in list" :key="item.type" style="margin-bottom: 20px;" class="box-card">
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
      </el-card>
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
          title: '全球专家领域分布',
          content: '全球人工智能专家在各个领域的分布报告',
          type: 'expert-domain'
        },
        {
          title: '全球专家行业分布',
          content: '全球人工智能专家在各个行业的分布报告',
          type: 'expert-industry'
        },
        {
          title: '全球研究人工智能机构分布',
          content: '全球研究人工智能的机构的分布报告',
          type: 'org'
        },
        {
          title: '全球TOP200人工智能专家',
          content: '全球排名前200的人工智能专家详情',
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
    padding: 20px 0;
    .box-card {
      width: 48%;
      cursor: pointer;
    }
    .box-card:hover {
      .word p {
        color: rgba(0, 0, 0, 1);
      }
    }
    .box-card:nth-child(odd) {
      float: left;
    }
    .box-card:nth-child(even) {
      float: right;
    }
    .report-wrapper {
      height: 100px;
      .report-item {
        border-bottom: solid 1px #ccc;
        padding-bottom: 15px;
        display: flex;
        justify-content: space-between;
        .more {
          font-size: 12px;
          color: #409eff;
          cursor: pointer;
        }
        .title {
          font-size: 16px;
          font-weight: 600;
          color: #409eff;
          padding-left: 10px;
          border-left: solid 3px #409eff;
          display: flex;
          align-items: center;
        }
      }
      .report-item:hover {
        cursor: pointer;
      }
      .content {
        display: flex;
        flex-flow: row nowrap;
        .word {
          flex: 1 1 auto;
          padding-right: 30px;
          padding-top: 15px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
          line-height: 24px;
        }
      }
    }
  }
}
</style>
