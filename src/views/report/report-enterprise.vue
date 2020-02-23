<template>
  <div class="report-enterprise-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="Enterprise" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">Amount of enterprise in Artificial Intelligence</h3>
        <div class="chart-wrapper">
          <map-chart />
        </div>
      </el-card>

      <el-card>
        <h3 class="chart-title">Growth trend of Enterprises in the field of Artificial Intelligence</h3>
        <!-- <bar-line-chart :columns="dataSet.columns" :list="dataSet.list" /> -->
        <bar-line :filters="filters" :source="barSource" :max1="50000" :min2="-60" :max2="100" />
      </el-card>
    </div>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import ReportBreadcrumb from '@/components/report-breadcrumb'
import MapChart from '@/components/charts/map'
import BarLine from '@/components/charts/bar-line'

export default {
  name: 'ReportEnterprise',

  components: {
    ReportBreadcrumb,
    MapChart,
    BarLine
  },

  data() {
    return {
      // pieChartData: {
      //   columns: ['领域', '企业数量'],
      //   rows: [
      //     { 领域: '人工智能基础', 企业数量: 22045 },
      //     { 领域: '人机混合智能', 企业数量: 6420 },
      //     { 领域: '机器学习', 企业数量: 9909 },
      //     { 领域: '知识系统', 企业数量: 1580 },
      //     { 领域: '神经网络', 企业数量: 2502 },
      //     { 领域: '自然语言处理', 企业数量: 2851 },
      //     { 领域: '计算机视觉技术', 企业数量: 12825 }
      //   ]
      // },
      filters: [
        'Fundamentals of Artificial Intelligence',
        'Human Machine Hybrid Intelligence',
        'Machine Learning',
        'Knowledge System',
        'Neural Network',
        'NLP',
        'Computer Vision'
      ],
      barSource: [
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2016,
          cnt: 8921,
          rate: 39
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2017,
          cnt: 11924,
          rate: 34
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2018,
          cnt: 11970,
          rate: 1
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2016,
          cnt: 3852,
          rate: 34
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2017,
          cnt: 5075,
          rate: 32
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2018,
          cnt: 6420,
          rate: 27
        },
        {
          domain: 'Machine Learning',
          year: 2016,
          cnt: 5834,
          rate: 34
        },
        {
          domain: 'Machine Learning',
          year: 2017,
          cnt: 5303,
          rate: -9
        },
        {
          domain: 'Machine Learning',
          year: 2018,
          cnt: 5457,
          rate: 3
        },
        {
          domain: 'Knowledge System',
          year: 2016,
          cnt: 1008,
          rate: 25
        },
        {
          domain: 'Knowledge System',
          year: 2017,
          cnt: 1273,
          rate: 26
        },
        {
          domain: 'Knowledge System',
          year: 2018,
          cnt: 1580,
          rate: 24
        },
        {
          domain: 'Neural Network',
          year: 2016,
          cnt: 1249,
          rate: 38
        },
        {
          domain: 'Neural Network',
          year: 2017,
          cnt: 1733,
          rate: 39
        },
        {
          domain: 'Neural Network',
          year: 2018,
          cnt: 2502,
          rate: 44
        },
        {
          domain: 'NLP',
          year: 2016,
          cnt: 1538,
          rate: 37
        },
        {
          domain: 'NLP',
          year: 2017,
          cnt: 2145,
          rate: 40
        },
        {
          domain: 'NLP',
          year: 2018,
          cnt: 2851,
          rate: 33
        },
        {
          domain: 'Computer Vision',
          year: 2016,
          cnt: 4910,
          rate: 1
        },
        {
          domain: 'Computer Vision',
          year: 2017,
          cnt: 6494,
          rate: 32
        },
        {
          domain: 'Computer Vision',
          year: 2018,
          cnt: 8031,
          rate: 24
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.report-enterprise-wrapper {
  .breadcrumb {
    padding: 20px 0;
  }

  .container {
    .chart-title {
      margin: 10px 0 20px 0;
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
