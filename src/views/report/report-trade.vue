<template>
  <div class="report-trade-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="Transaction in Technology" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3
          class="chart-title"
        >Contract Release of Technology Transaction in Artificial Intelligence</h3>
        <row-bar
          :show-lengend="true"
          title="Technical Consultation"
          :data1="barData.consultation.ai"
          :data2="barData.consultation.notAi"
          left="23%"
          :max="7000"
        />
        <row-bar
          title="Technological Development"
          :data1="barData.develop.ai"
          :data2="barData.develop.notAi"
          left="23%"
          :max="7000"
        />
        <row-bar
          title="Technical Service"
          :data1="barData.service.ai"
          :data2="barData.service.notAi"
          left="23%"
          :max="7000"
        />
        <row-bar
          title="Technology Transfer"
          :show-x="true"
          :data1="barData.transfer.ai"
          :data2="barData.transfer.notAi"
          left="23%"
          :max="7000"
        />
      </el-card>

      <el-card>
        <h3
          class="chart-title"
        >Contract Growth Trend of Technology Transaction in Artificial Intelligence</h3>
        <bar-line :filters="filters" :source="barSource" :max1="1500" :min2="-200" :max2="50" />
      </el-card>
    </div>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import ReportBreadcrumb from '@/components/report-breadcrumb'
import RowBar from '@/components/charts/row-bar'
import BarLine from '@/components/charts/bar-line'

export default {
  name: 'ReportBook',

  components: {
    ReportBreadcrumb,
    RowBar,
    BarLine
  },

  data() {
    return {
      barData: {
        consultation: {
          ai: [92, 39, 15],
          notAi: [1368, 692, 328]
        },
        develop: {
          ai: [553, 529, 441],
          notAi: [6779, 6628, 5729]
        },
        service: {
          ai: [400, 258, 167],
          notAi: [5717, 3967, 3222]
        },
        transfer: {
          ai: [69, 57, 58],
          notAi: [680, 662, 666]
        }
      },
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
          cnt: 661,
          rate: -7
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2017,
          cnt: 569,
          rate: -14
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2018,
          cnt: 421,
          rate: -26
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2016,
          cnt: 234,
          rate: -12
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2017,
          cnt: 196,
          rate: -16
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2018,
          cnt: 142,
          rate: -28
        },
        {
          domain: 'Machine Learning',
          year: 2016,
          cnt: 477,
          rate: -2
        },
        {
          domain: 'Machine Learning',
          year: 2017,
          cnt: 352,
          rate: -26
        },
        {
          domain: 'Machine Learning',
          year: 2018,
          cnt: 274,
          rate: -22
        },
        {
          domain: 'Knowledge System',
          year: 2016,
          cnt: 121,
          rate: -1
        },
        {
          domain: 'Knowledge System',
          year: 2017,
          cnt: 97,
          rate: -20
        },
        {
          domain: 'Knowledge System',
          year: 2018,
          cnt: 67,
          rate: -30
        },
        {
          domain: 'Neural Network',
          year: 2016,
          cnt: 188,
          rate: -6
        },
        {
          domain: 'Neural Network',
          year: 2017,
          cnt: 160,
          rate: -15
        },
        {
          domain: 'Neural Network',
          year: 2018,
          cnt: 104,
          rate: -35
        },
        {
          domain: 'NLP',
          year: 2016,
          cnt: 115,
          rate: -5
        },
        {
          domain: 'NLP',
          year: 2017,
          cnt: 113,
          rate: -2
        },
        {
          domain: 'NLP',
          year: 2018,
          cnt: 81,
          rate: -28
        },
        {
          domain: 'Computer Vision',
          year: 2016,
          cnt: 503,
          rate: -5
        },
        {
          domain: 'Computer Vision',
          year: 2017,
          cnt: 381,
          rate: -24
        },
        {
          domain: 'Computer Vision',
          year: 2018,
          cnt: 295,
          rate: -26
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.report-trade-wrapper {
  .breadcrumb {
    padding: 20px 0;
  }

  .radio {
    margin: 20px 0 10px 0;
  }

  .container {
    .chart-title {
      margin: 10px 0 20px 0;
      font-weight: 600;
    }
  }

  /deep/ .el-radio {
    margin-right: 15px;
  }
}
</style>
