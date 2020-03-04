<template>
  <div class="report-expert-industry-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="全球专家行业分布" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <!-- <div class="header-wrapper">
          <h3 class="chart-title">全球专家行业分布</h3>
          <a href="./data/专家详情信息表字段.xlsx" download="全球专家领域分布数据.xlsx"
            ><i class="el-icon-download"
          /></a>
        </div> -->
        <h3 class="chart-title">全球专家行业分布</h3>
        <div class="chart-wrapper">
          <chart-map :legend="aiIndustry" :map-data="mapData" />
        </div>
      </el-card>
      <div class="space-10" />
    </div>
  </div>
</template>

<script>
import ChartMap from '@/components/charts/map'
import AI_INDUSTRY from '@/utils/constant'
import MockData from '@/mock-data/expert-industry'

export default {
  name: 'ReportExpertIndustry',

  components: {
    ChartMap
  },

  data() {
    return {
      aiIndustry: AI_INDUSTRY,
      mapData: MockData
    }
  }
}
</script>

<style lang="less" scoped>
.report-expert-industry-wrapper {
  .container {
    .header-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      a {
        color: #66b1ff;
      }
    }
    .chart-title {
      margin: 10px 0 20px 0;
      font-size: 16px;
      font-weight: 600;
      position: relative;
      padding-left: 10px;

      &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        // top: 9px;
        width: 4px;
        height: 20px;
        background: #66b1ff;
      }
    }

    .chart-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
    }

    .space-10 {
      height: 10px;
    }
  }
}
</style>
