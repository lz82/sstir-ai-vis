<template>
  <div class="report-expert-domain-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="全球人工智能顶尖科研专家领域分布" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家领域分布</h3>
          <a
            href="/data/excel/全球专家分布.xlsx"
            download="全球专家分布.xlsx"
            target="_blank"
            ><i class="el-icon-download"
          /></a>
        </div>
        <div class="chart-wrapper">
          <chart-map :legend="legendData" :map-data="mapData" />
        </div>
      </el-card>

      <div class="space-10" />
      <el-card style="margin-bottom: 20px;">
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家学历情况</h3>
          <a href="/data/excel/专家学历分布.xlsx" download="专家学历分布.xlsx" target="_blank"
            ><i class="el-icon-download"
          /></a>
        </div>
        <div class="chart-wrapper">
          <chart-bar :y-axis="legendNoALlData" :legend="degreeType" :chart-data="degreeData" />
        </div>
      </el-card>

      <div class="space-10" />

      <el-card style="margin-bottom: 20px;">
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家领域占比</h3>
          <a href="/data/excel/专家领域分布.xlsx" download="专家领域分布.xlsx" target="_blank"
            ><i class="el-icon-download"
          /></a>
        </div>
        <div class="chart-wrapper">
          <chart-pie :legend="legendData" :chart-data="pieData" />
        </div>
      </el-card>

      <div class="space-10" />
    </div>
  </div>
</template>

<script>
import ChartMap from '@/components/charts/map'
import ChartBar from '@/components/charts/bar'
import ChartPie from '@/components/charts/pie'
import { AI_DOMAIN, AI_DOMAIN_NO_ALL } from '@/utils/constant'
import expertDomainData from './data/data.json'

export default {
  name: 'ReportExpertDomain',

  components: {
    ChartMap,
    ChartBar,
    ChartPie
  },

  data() {
    return {
      legendData: AI_DOMAIN,
      legendNoALlData: AI_DOMAIN_NO_ALL,
      mapData: expertDomainData,
      degreeType: ['博士', '非博士'],
      degreeData: [
        {
          name: '博士',
          type: 'bar',
          stack: '总量',
          label: {
            show: false,
            position: 'insideRight'
          },
          barMinWidth: 10,
          data: [724, 590, 584, 548, 368, 202, 155, 102, 37, 25, 20, 18, 13, 8, 3, 2, 1, 1]
        },
        {
          name: '非博士',
          type: 'bar',
          stack: '总量',
          label: {
            show: false,
            position: 'insideRight',
            distance: -20
          },
          barMinWidth: 10,
          data: [287, 220, 215, 211, 137, 75, 50, 28, 8, 13, 8, 8, 3, 2, 1, 0, 0, 0]
        }
      ],
      pieData: [
        { name: '数据挖掘', value: 1011 },
        { name: '自然语言处理', value: 810 },
        { name: '机器学习', value: 799 },
        { name: '芯片技术', value: 759 },
        { name: '人机交互', value: 505 },
        { name: '知识工程', value: 277 },
        { name: '语音识别', value: 205 },
        { name: '计算机视觉', value: 130 },
        { name: '信息检索与推荐', value: 45 },
        { name: '机器人', value: 38 },
        { name: '数据库', value: 28 },
        { name: '可视化', value: 26 },
        { name: '安全与隐私', value: 16 },
        { name: '计算机图形', value: 10 },
        { name: '计算机网络', value: 4 }
        // { name: '物联网', value: 2 },
        // { name: '多媒体', value: 1 },
        // { name: '计算机系统', value: 1 }
      ]
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="less" scoped>
.report-expert-domain-wrapper {
  .container {
    .header-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 40px;
      h3 {
        padding-left: 10px;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 20px;
          background: #66b1ff;
        }
      }

      a {
        color: #66b1ff;
      }
    }
    .chart-title {
      // margin: 10px 0 20px 0;
      font-size: 16px;
      font-weight: 600;
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
