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
          <chart-map :legend="aiIndustry" :map-data="mapData" :pieces="pieces" />
        </div>
      </el-card>
      <div class="space-10" />
    </div>
  </div>
</template>

<script>
import ChartMap from '@/components/charts/map'
import AI_INDUSTRY from '@/utils/constant'
import mapData from './data/data'

export default {
  name: 'ReportExpertIndustry',

  components: {
    ChartMap
  },

  data() {
    return {
      aiIndustry: AI_INDUSTRY,
      mapData: mapData,
      pieces: [
        {
          gte: 1000,
          label: `> 1000 人`,
          color: '#8c0d0d'
        },
        {
          gte: 500,
          lt: 999,
          label: `500 - 999 人`,
          color: '#cc2928'
        },
        {
          gte: 50,
          lt: 499,
          label: `50 - 499 人`,
          color: '#ff7b69'
        },
        {
          gte: 1,
          lt: 49,
          label: `1 - 49 人`,
          color: '#ffaa85'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.report-expert-industry-wrapper {
  .container {
    .chart-title {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      position: relative;
      padding-left: 10px;

      &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        transform: translateY(-50%);
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
  /deep/ .el-card__body {
    padding-top: 5px !important;
  }
}
</style>
