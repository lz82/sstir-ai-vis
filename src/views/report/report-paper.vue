<template>
  <div class="report-paper-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="Article" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">Distribution of Articles in the field of Artificial Intelligence</h3>
        <muliti-ring
          :dimension="dimension"
          :source="ringSource"
          :series="ringSeries"
          :title="ringTitles"
        />
      </el-card>

      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">The growth trend of Article in Artificial Intelligence</h3>
        <bar-line :filters="filters" :source="barSource" />
      </el-card>

      <el-card>
        <h3 class="chart-title">Recommendation of authoritative journals / conferences in the field of Artificial Intelligence</h3>

        <div class="table-container">
          <el-tabs v-model="activeTab" type="card">
            <el-tab-pane label="Hot journal recommendation">
              <el-table :data="hotJournalsList" stripe>
                <el-table-column prop="name" label="Journal Title" align="center" header-align="center" />
                <el-table-column prop="domain" label="Related Field" align="center" header-align="center" />
                <el-table-column prop="score" label="Impact Factor" align="center" header-align="center" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Hot conference recommendation">
              <el-table :data="hotMeetingList" stripe>
                <el-table-column prop="name" label="conference Title" header-align="center" align="center" />
                <el-table-column prop="domain" label="Related Field" header-align="center" align="center" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
      <div style="height: 20px;"></div>
    </div>
  </div>
</template>

<script>
import ReportBreadcrumb from '@/components/report-breadcrumb'
import MulitiRing from '@/components/charts/muliti-ring'
import BarLine from '@/components/charts/bar-line'

export default {
  name: 'ReportPaper',

  components: {
    ReportBreadcrumb,
    BarLine,
    MulitiRing
  },

  data() {
    return {
      activeTab: '0',
      hotJournalsList: [
        {
          name: 'TACL',
          domain: 'NLP',
          score: 2.13
        },
        {
          name: 'IJCV',
          domain: 'Computer Vision',
          score: 6.07
        },
        {
          name: 'JMLR',
          domain: 'Machine Learning',
          score: 4.09
        },
        {
          name: 'TKDE',
          domain: 'Knowledge System',
          score: 3.85
        },
        {
          name: 'TPAMI',
          domain: 'ALL',
          score: 17.73
        },
        {
          name: 'AI',
          domain: 'ALL',
          score: 4.48
        },
        {
          name: 'TAP',
          domain: 'ALL',
          score: 11.22
        },
        {
          name: 'TSLP',
          domain: 'ALL',
          score: '-'
        },
        {
          name: 'AAMAS',
          domain: 'ALL',
          score: 14.19
        },
        {
          name: 'CVIU',
          domain: 'ALL',
          score: 2.64
        }
      ],
      hotMeetingList: [
        {
          name: 'ACL',
          domain: 'NLP'
        },
        {
          name: 'EMNLP',
          domain: 'NLP'
        },
        {
          name: 'NAACL',
          domain: 'NLP'
        },
        {
          name: 'COLING',
          domain: 'NLP'
        },
        {
          name: 'CVPR',
          domain: 'Computer Vision'
        },
        {
          name: 'ICCV',
          domain: 'Computer Vision'
        },
        {
          name: 'ECCV',
          domain: 'Computer Vision'
        },
        {
          name: 'NIPS',
          domain: 'Machine Learning'
        },
        {
          name: 'ICML',
          domain: 'Machine Learning'
        },
        {
          name: 'TKDE',
          domain: 'Knowledge System'
        },
        {
          name: 'SIGKDD',
          domain: 'Knowledge System'
        },
        {
          name: 'CIKM',
          domain: 'Knowledge System'
        },
        {
          name: 'ICLR',
          domain: 'Neural Network'
        },
        {
          name: 'AAAI',
          domain: 'ALL'
        },
        {
          name: 'IJCAI',
          domain: 'ALL'
        }
      ],
      dimension: ['cnt', '2016', '2017', '2018'],
      ringSource: [
        {
          cnt: 'Fundamentals of Artificial Intelligence', // Fundamentals of Artificial Intelligence
          '2016': 762288,
          '2017': 844475,
          '2018': 914764
        },
        {
          cnt: 'Human Machine Hybrid Intelligence', // Human Machine Hybrid Intelligence
          '2016': 77164,
          '2017': 82221,
          '2018': 85285
        },
        {
          cnt: 'Machine Learning', // Machine Learning
          '2016': 519005,
          '2017': 566482,
          '2018': 595997
        },
        { cnt: 'Knowledge System', '2016': 80953, '2017': 83693, '2018': 85076 }, // Knowledge System
        { cnt: 'Neural Network', '2016': 87478, '2017': 93534, '2018': 96344 }, // Neural Network
        {
          cnt: 'Natural Language Processing', // NLP
          '2016': 36676,
          '2017': 39989,
          '2018': 42144
        },
        {
          cnt: 'Computer Vision', // Computer Vision
          '2016': 110496,
          '2017': 121023,
          '2018': 128461
        }
      ],
      ringSeries: [
        {
          name: 'Articles Count',
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
          name: 'Articles Count',
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
          name: 'Articles Count',
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
          cnt: 762288,
          rate: 11
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2017,
          cnt: 844475,
          rate: 11
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2018,
          cnt: 914764,
          rate: 8
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2016,
          cnt: 77164,
          rate: 8
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2017,
          cnt: 82221,
          rate: 7
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2018,
          cnt: 85285,
          rate: 4
        },
        {
          domain: 'Machine Learning',
          year: 2016,
          cnt: 519005,
          rate: 11
        },
        {
          domain: 'Machine Learning',
          year: 2017,
          cnt: 566482,
          rate: 9
        },
        {
          domain: 'Machine Learning',
          year: 2018,
          cnt: 595997,
          rate: 5
        },
        {
          domain: 'Knowledge System',
          year: 2016,
          cnt: 80953,
          rate: 4
        },
        {
          domain: 'Knowledge System',
          year: 2017,
          cnt: 83693,
          rate: 3
        },
        {
          domain: 'Knowledge System',
          year: 2018,
          cnt: 85076,
          rate: 2
        },
        {
          domain: 'Neural Network',
          year: 2016,
          cnt: 87478,
          rate: 7
        },
        {
          domain: 'Neural Network',
          year: 2017,
          cnt: 93534,
          rate: 7
        },
        {
          domain: 'Neural Network',
          year: 2018,
          cnt: 96344,
          rate: 3
        },
        {
          domain: 'NLP',
          year: 2016,
          cnt: 36676,
          rate: 1
        },
        {
          domain: 'NLP',
          year: 2017,
          cnt: 39989,
          rate: 1
        },
        {
          domain: 'NLP',
          year: 2018,
          cnt: 42144,
          rate: 5
        },
        {
          domain: 'Computer Vision',
          year: 2016,
          cnt: 110496,
          rate: 1
        },
        {
          domain: 'Computer Vision',
          year: 2017,
          cnt: 121023,
          rate: 1
        },
        {
          domain: 'Computer Vision',
          year: 2018,
          cnt: 128461,
          rate: 6
        }
      ]
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
.report-paper-wrapper {
  .breadcrumb {
    padding: 20px 0;
  }

  .container {
    .chart-title {
      margin: 10px 0 20px 0;
      font-weight: 600;
    }

    //  .pie-chart-content {
    //    display: flex;
    //    flex-flow: row nowrap;
    //    justify-content: space-between;
    //  }
    //  .pie-chart {
    //    flex: 0 0 33%;
    //  }
  }
}
</style>
