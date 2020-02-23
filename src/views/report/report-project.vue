<template>
  <div class="report-project-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="Project" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">Distribution of AI enterprises participating in government projects</h3>
        <row-bar
          :show-lengend="true"
          title="Innovation & Entrepreneurship"
          :data1="barData.new.ai"
          :data2="barData.new.notAi"
          left="25%"
        />
        <row-bar title="Little Giant" :data1="barData.big.ai" :data2="barData.big.notAi" left="25%" />
        <row-bar
          title="High Tech Enterprises"
          :show-x="true"
          :data1="barData.hight.ai"
          :data2="barData.hight.notAi"
          left="25%"
        />
      </el-card>

      <el-card>
        <h3
          class="chart-title"
        >The growth trend of AI enterprises participating in government projects</h3>
        <bar-line
          :filters="filters"
          :source="barSource"
          :max1="1000"
          :min2="-100"
          :max2="130"
        />
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
  name: 'ReportProject',

  components: {
    ReportBreadcrumb,
    RowBar,
    BarLine
  },

  data() {
    return {
      barData: {
        hight: {
          ai: [194, 297, 247],
          notAi: [2824, 2976, 3457]
        },
        big: {
          ai: [27, 9, 23],
          notAi: [185, 153, 157]
        },
        new: {
          ai: [63, 31, 6],
          notAi: [188, 38, 79]
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
          cnt: 136,
          rate: 13
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2017,
          cnt: 182,
          rate: 34
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2018,
          cnt: 136,
          rate: -25
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2016,
          cnt: 50,
          rate: 22
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2017,
          cnt: 74,
          rate: 48
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2018,
          cnt: 49,
          rate: -34
        },
        {
          domain: 'Machine Learning',
          year: 2016,
          cnt: 85,
          rate: 22
        },
        {
          domain: 'Machine Learning',
          year: 2017,
          cnt: 96,
          rate: 13
        },
        {
          domain: 'Machine Learning',
          year: 2018,
          cnt: 59,
          rate: -39
        },
        {
          domain: 'Knowledge System',
          year: 2016,
          cnt: 25,
          rate: 2
        },
        {
          domain: 'Knowledge System',
          year: 2017,
          cnt: 30,
          rate: 20
        },
        {
          domain: 'Knowledge System',
          year: 2018,
          cnt: 16,
          rate: -47
        },
        {
          domain: 'Neural Network',
          year: 2016,
          cnt: 27,
          rate: 30
        },
        {
          domain: 'Neural Network',
          year: 2017,
          cnt: 44,
          rate: 63
        },
        {
          domain: 'Neural Network',
          year: 2018,
          cnt: 19,
          rate: -57
        },
        {
          domain: 'NLP',
          year: 2016,
          cnt: 18,
          rate: 30
        },
        {
          domain: 'NLP',
          year: 2017,
          cnt: 40,
          rate: 122
        },
        {
          domain: 'NLP',
          year: 2018,
          cnt: 28,
          rate: -30
        },
        {
          domain: 'Computer Vision',
          year: 2016,
          cnt: 69,
          rate: 19
        },
        {
          domain: 'Computer Vision',
          year: 2017,
          cnt: 105,
          rate: 52
        },
        {
          domain: 'Computer Vision',
          year: 2018,
          cnt: 82,
          rate: -22
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.report-project-wrapper {
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
