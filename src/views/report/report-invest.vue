<template>
  <div class="report-invest-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="Investor" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">Amount of investment in Artificial Intelligence</h3>
        <div class="chart-container">
          <div class="chart">
            <pie :legend="pieLegendData" :chart-data="pieData" />
          </div>
          <div class="chart">
            <bar :legend="barLegendData" :y="pieLegendData" :chart-data="barChartData" />
          </div>
        </div>
      </el-card>

      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">Increase in Investment in Artificial Intelligence</h3>
        <div class="line-container">
          <div class="chart">
            <stack-line :legend="pieLegendData" :chart-data="lineChartData" />
          </div>
          <div class="top">
            <h4 style="font-size: 16px; font-weight: 600;">
              Investment growth ranking (10000 yuan)
            </h4>
            <ul>
              <li v-for="(item, index) in rateList" :key="item.domain">
                <span class="circle" :style="{ backgroundColor: calcColor(index) }">{{
                  index + 1
                }}</span>
                <span class="domain">{{ item.domain }}</span>
                <span class="rate">{{ item.rate }}</span>
                <span class="cnt">{{ item.cnt }}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-card>

      <el-card>
        <h3 class="chart-title">Recommendation of Investment institutions</h3>
        <el-table :data="investList">
          <el-table-column label align="center" width="100">
            <template slot-scope="scope">
              <i
                v-for="item in calcArr(scope.$index)"
                v-show="scope.$index < 3"
                :key="item"
                class="iconfont iconfire"
                style="color: #F56C6C;"
              />
              <span v-show="scope.$index > 2">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Organization Name" prop="name" />
          <el-table-column label="Field" prop="category" width="240" />
          <el-table-column label="Fund (10000 yuan)" prop="fund" width="240" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import ReportBreadcrumb from '@/components/report-breadcrumb'
import Pie from '@/components/charts/pie'
import Bar from '@/components/charts/simple-bar'
import StackLine from '@/components/charts/stack-line'

export default {
  name: 'ReportInvest',

  components: {
    ReportBreadcrumb,
    Pie,
    Bar,
    StackLine
  },

  data() {
    return {
      pieLegendData: [
        'Game',
        'New industry',
        'Electronic Commerce',
        'Vehicle Transportation',
        'Logistics',
        'Education',
        'Health-Care',
        'Real Estate Service',
        'Local Life',
        'Social Networks',
        'Hardware',
        'Enterprise service',
        'Tourism',
        'Finance',
        'Tool Software',
        'Entertainment Media'
      ],
      pieData: [
        { name: 'Game', value: 10008765.65 },
        { name: 'New industry', value: 4073405.95 },
        { name: 'Electronic Commerce', value: 12942911.94 },
        { name: 'Vehicle Transportation', value: 39945150.57 },
        { name: 'Logistics', value: 24345935.27 },
        { name: 'Education', value: 20637767.64 },
        { name: 'Health-Care', value: 23713182.6 },
        { name: 'Entertainment Media', value: 9081155.85 },
        { name: 'Real Estate Service', value: 11277602.73 },
        { name: 'Local Life', value: 17306212.4 },
        { name: 'Social Networks', value: 20630665.11 },
        { name: 'Hardware', value: 50810411.13 },
        { name: 'Tourism', value: 5736505.34 },
        { name: 'Finance', value: 15097147.37 },
        { name: 'Tool Software', value: 3963614.46 },
        { name: 'Enterprise service', value: 45651765.08 }
      ],
      barLegendData: [{ name: 'Quota(10000 yuan)' }],
      barChartData: [
        10008765.65,
        4073405.95,
        12942911.94,
        39945150.57,
        24345935.27,
        20637767.64,
        23713182.6,
        11277602.73,
        17306212.4,
        20630665.11,
        50810411.13,
        45651765.08,
        5736505.34,
        15097147.37,
        3963614.46,
        9081155.85
      ],
      barChartSettings: {
        dataOrder: {
          label: '额度',
          order: 'desc'
        },
        legendName: {
          额度: '额度(万元)'
        },
        label: {
          show: true,
          position: ['100%', 0]
        }
      },
      lineChartData: [
        {
          name: 'Enterprise service',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [3173906.18, 4726037.39, 18185454.41]
        },
        {
          name: 'Social Networks',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [18427369.58, 246156.41, 257232.07]
        },
        {
          name: 'Game',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [688953.1, 688953.1, 688953.1]
        },
        {
          name: 'New industry',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [688953.1, 493948.52, 288481.62]
        },
        {
          name: 'Electronic Commerce',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [889006.38, 6086419.39, 3946527.57]
        },
        {
          name: 'Vehicle Transportation',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [2923063.13, 16487486.08, 10597534.1]
        },
        {
          name: 'Logistics',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [562201.91, 8412037.5, 13035680.18]
        },
        {
          name: 'Education',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [17661540.5, 474554.83, 1017166.44]
        },
        {
          name: 'Health-Care',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [1446306.04, 2303756.79, 14350268.66]
        },
        {
          name: 'Real Estate Service',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [1173378.34, 3230623.56, 1880614.6]
        },
        {
          name: 'Local Life',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [7345889.91, 3187653.74, 3357501.86]
        },
        {
          name: 'Hardware',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [34563790.69, 2915478.47, 5991822.44]
        },
        {
          name: 'Tourism',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [759777.58, 657705.04, 1195763.35]
        },
        {
          name: 'Finance',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [2589006.75, 2640762.55, 5495250.53]
        },
        {
          name: 'Tool Software',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [571323.82, 761822.75, 648194.8]
        },
        {
          name: 'Entertainment Media',
          type: 'line',
          smooth: true,
          stack: 'total',
          data: [1524149.9, 2017518.47, 3742499.71]
        }
      ],
      rateList: [
        { domain: 'Health-Care ', rate: '523%', cnt: 12046511.87 },
        { domain: 'Enterprise service', rate: '284%', cnt: 13459417.02 },
        { domain: 'Education', rate: '114%', cnt: 542611.61 },
        { domain: 'Finance', rate: '108%', cnt: 2854487.98 },
        { domain: 'Hardware', rate: '105%', cnt: 3076343.97 },
        { domain: 'Game', rate: '92%', cnt: 514618.62 },
        { domain: 'Entertainment Media', rate: '86%', cnt: 1724981.24 },
        { domain: 'Tourism', rate: '82%', cnt: 538058.31 },
        { domain: 'Logistics', rate: '55%', cnt: 4623642.68 }
      ],
      investList: [
        {
          id: 1,
          name: 'Qualcomm Ventures',
          category: 'Hardware',
          fund: 36488396.84
        },
        {
          id: 2,
          name: 'Microsoft',
          category: 'Social Networks',
          fund: 18029104.1
        },
        {
          id: 3,
          name: 'Hillhouse',
          category: 'Logistics',
          fund: 11438700
        },
        {
          id: 4,
          name: 'Intel Capital',
          category: 'Vehicle Transportation',
          fund: 10610196
        },
        {
          id: 5,
          name: 'Soft Bank',
          category: 'Real Estate Service',
          fund: 7909010
        },
        {
          id: 6,
          name: 'Fortune Capital',
          category: 'Enterprise service',
          fund: 6538992.21
        },
        {
          id: 7,
          name: 'Hundreds Capital',
          category: 'Game',
          fund: 5914564
        },
        {
          id: 8,
          name: 'China Integrated Circuit Industry Investment Fund',
          category: 'Hardware',
          fund: 3320664.6
        },
        {
          id: 9,
          name: 'Battery Ventures',
          category: 'Enterprise service',
          fund: 3318613.82
        },
        {
          id: 10,
          name: 'K11',
          category: 'Logistics',
          fund: 3026056
        }
      ]
    }
  },

  methods: {
    calcColor(index) {
      const colors = ['#F56C6C', '#67C23A', '#E6A23C', '#909399']
      if (index > 2) {
        return colors[3]
      } else {
        return colors[index]
      }
    },

    calcArr(index) {
      return 3 - index > 0 ? 3 - index : 0
    }
  }
}
</script>

<style lang="less" scoped>
.report-invest-wrapper {
  padding-bottom: 30px;
  .breadcrumb {
    padding: 20px 0;
  }

  .container {
    .chart-title {
      margin: 10px 0 20px 0;
      font-weight: 600;
    }

    .chart-container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      .chart {
        flex: 0 0 50%;
      }
    }

    .line-container {
      display: flex;
      flex-flow: row nowrap;

      h4 {
        font-size: 12px;
        padding: 0 0 20px 20px;
      }
      .chart {
        flex: 0 0 65%;
      }
      .top {
        flex: 0 0 35%;

        ul {
          margin-top: 15px;
          li {
            line-height: 48px;
            padding: 0 10px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            .circle {
              flex: 0 0 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 24px;
              height: 24px;
              border-radius: 12px;
              text-align: center;
              vertical-align: middle;
              //  background-color: red;
              color: #fff;
            }
            .domain {
              flex: 0 0 200px;
              padding-left: 5px;
            }
            .rate {
              flex: 0 0 50px;
              color: rgba(0, 0, 0, 0.5);
            }
            .cnt {
              flex: 0 0 80px;
              color: rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
    }
  }
}
</style>
