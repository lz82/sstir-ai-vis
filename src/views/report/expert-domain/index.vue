<template>
  <div class="report-expert-domain-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="全球专家领域分布" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">全球分布一览</h3>
        <div class="chart-wrapper">
          <chart-map :legend="legendData" :map-data="mapData" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import ChartMap from '@/components/charts/map'
import { AI_DOMAIN } from '@/utils/constant'
import expertDomainData from '@/mock-data/expert-domain'

export default {
  name: 'ReportExpertDomain',

  components: {
    ChartMap
  },

  data() {
    return {
      legendData: AI_DOMAIN,
      mapData: expertDomainData
    }
  },

  mounted() {
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
.report-expert-domain-wrapper {
  .container {
    .chart-title {
      margin: 10px 0 20px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .chart-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
    }
  }
}
</style>
