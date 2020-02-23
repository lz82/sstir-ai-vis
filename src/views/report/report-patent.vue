<template>
  <div class="report-patent-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="Patent" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">Distribution of Patents in Artificial Intelligence</h3>
        <muliti-ring
          :dimension="dimension"
          :source="ringSource"
          :series="ringSeries"
          :title="ringTitles"
        />
      </el-card>

      <el-card>
        <h3 class="chart-title">The growth trend of patent in Artificial Intelligence</h3>
        <bar-line
          :filters="filters"
          :source="barSource"
          :max1="300000"
          :max2="60"
        />
      </el-card>
    </div>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import ReportBreadcrumb from '@/components/report-breadcrumb'
import MulitiRing from '@/components/charts/muliti-ring'
import BarLine from '@/components/charts/bar-line'

export default {
  name: 'ReportPatent',

  components: {
    ReportBreadcrumb,
    MulitiRing,
    BarLine
  },

  data() {
    return {
      dimension: ['cnt', '2016', '2017', '2018'],
      ringSource: [
        {
          cnt: 'Fundamentals of Artificial Intelligence', // Fundamentals of Artificial Intelligence
          '2016': 81511,
          '2017': 113221,
          '2018': 154867
        },
        {
          cnt: 'Human Machine Hybrid Intelligence', // Human Machine Hybrid Intelligence
          '2016': 12924,
          '2017': 16951,
          '2018': 21372
        },
        {
          cnt: 'Machine Learning', // Machine Learning
          '2016': 30176,
          '2017': 39224,
          '2018': 50661
        },
        { cnt: 'Knowledge System', '2016': 4071, '2017': 5022, '2018': 6045 }, // Knowledge System
        { cnt: 'Neural Network', '2016': 4837, '2017': 7141, '2018': 11378 }, // Neural Network
        {
          cnt: 'Natural Language Processing', // NLP
          '2016': 6541,
          '2017': 8483,
          '2018': 11123
        },
        {
          cnt: 'Computer Vision', // Computer Vision
          '2016': 27576,
          '2017': 35952,
          '2018': 45121
        }
      ],
      ringSeries: [
        {
          name: 'Number of Patents',
          type: 'pie',
          radius: ['25%', '35%'],
          center: ['17%', '60%'],
          label: {
            show: true,
            formatter: this.ringFormat
          },
          encode: {
            itemName: 'cnt',
            value: '2016'
          }
        },
        {
          name: 'Number of Patents',
          type: 'pie',
          radius: ['25%', '35%'],
          center: ['50%', '60%'],
          label: {
            show: true,
            formatter: this.ringFormat
          },
          encode: {
            itemName: 'cnt',
            value: '2017'
          }
        },
        {
          name: 'Number of Patents',
          type: 'pie',
          radius: ['25%', '35%'],
          center: ['82%', '60%'],
          label: {
            show: true,
            formatter: this.ringFormat
          },
          encode: {
            itemName: 'cnt',
            value: '2018'
          }
        }
      ],
      ringTitles: [
        {
          text: '2016',
          show: true,
          bottom: 0,
          left: '14%'
        },
        {
          text: '2017',
          show: true,
          bottom: 0,
          left: '47%'
        },
        {
          text: '2018',
          show: true,
          bottom: 0,
          left: '80%'
        }
      ],
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
          cnt: 81511,
          rate: 38
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2017,
          cnt: 113221,
          rate: 39
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2018,
          cnt: 154867,
          rate: 37
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2016,
          cnt: 12924,
          rate: 38
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2017,
          cnt: 16951,
          rate: 31
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2018,
          cnt: 21372,
          rate: 26
        },
        {
          domain: 'Machine Learning',
          year: 2016,
          cnt: 30176,
          rate: 33
        },
        {
          domain: 'Machine Learning',
          year: 2017,
          cnt: 39224,
          rate: 30
        },
        {
          domain: 'Machine Learning',
          year: 2018,
          cnt: 50661,
          rate: 30
        },
        {
          domain: 'Knowledge System',
          year: 2016,
          cnt: 4071,
          rate: 24
        },
        {
          domain: 'Knowledge System',
          year: 2017,
          cnt: 5022,
          rate: 23
        },
        {
          domain: 'Knowledge System',
          year: 2018,
          cnt: 6045,
          rate: 20
        },
        {
          domain: 'Neural Network',
          year: 2016,
          cnt: 4837,
          rate: 44
        },
        {
          domain: 'Neural Network',
          year: 2017,
          cnt: 7141,
          rate: 48
        },
        {
          domain: 'Neural Network',
          year: 2018,
          cnt: 11378,
          rate: 60
        },
        {
          domain: 'NLP',
          year: 2016,
          cnt: 6541,
          rate: 32
        },
        {
          domain: 'NLP',
          year: 2017,
          cnt: 8483,
          rate: 30
        },
        {
          domain: 'NLP',
          year: 2018,
          cnt: 11123,
          rate: 31
        },
        {
          domain: 'Computer Vision',
          year: 2016,
          cnt: 27576,
          rate: 35
        },
        {
          domain: 'Computer Vision',
          year: 2017,
          cnt: 35952,
          rate: 30
        },
        {
          domain: 'Computer Vision',
          year: 2018,
          cnt: 45121,
          rate: 26
        }
      ]
    }
  },

  computed: {
    pieList() {
      let ret = []
      let arr = [2016, 2017, 2018]
      arr.forEach((item) => {
        const temp = this.dataSet.list.filter((obj) => obj.year === item)
        let tempObj = {
          year: item,
          chartData: {
            columns: ['领域', '数量'],
            rows: []
          }
        }
        temp.forEach((i) => {
          tempObj.chartData.rows.push({
            领域: i.domain,
            数量: i.cnt
          })
        })
        ret.push(tempObj)
      })
      return ret
    },

    currentList() {
      return this.dataSet.list
        .filter((item) => item.domain === this.current)
        .sort((a, b) => a.year < b.year)
    }
  },

  methods: {
    ringFormat(val) {
      const temp = val.name.split(' ')
      let ret = []
      temp.forEach((item, index) => {
        ret.push(item)
        if ((index + 1) % 2 === 0) {
          ret.push('\n')
        } else {
          if (item.length > 8) {
            ret.push('\n')
          }
        }
      })
      return ret.join(' ')
    }
  }
}
</script>

<style lang="less" scoped>
.report-patent-wrapper {
  .breadcrumb {
    padding: 20px 0;
  }

  .container {
    .chart-title {
      margin: 10px 0 20px 0;
      font-weight: 600;
    }

    .pie-chart-content {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .pie-chart {
      flex: 0 0 33%;
    }
  }
}
</style>
