<template>
  <div class="report-expert-wrapper">

    <div class="breadcrumb">
      <report-breadcrumb
        type="Expert"
      />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">Growth trend of experts in Artificial Intelligence</h3>
        <bar-line :filters="filters" :source="barSource" />
      </el-card>

      <el-card>
        <h3 class="chart-title">Recommended of experts in the field of Artificial Intelligence</h3>

        <div class="content">
          <el-tabs v-model="currentTab">
            <el-tab-pane v-for="item in filters" :key="item" :label="item"></el-tab-pane>
          </el-tabs>
          <div class="list">
            <el-table
              :data="expertList"
              sortable="custom"
              :default-sort = "{prop: sortBy, order: sortMethod}"
              @sort-change="onSort"
            >
              <el-table-column
                prop="name"
                label="Expert"
                header-align="center"
                align="center"
                width="200"
              />
              <el-table-column
                prop="affiliationName"
                label="Organization"
                header-align="center"
                width="200"
                show-overflow-tooltip
              />
              <!-- <el-table-column
                prop="sub"
                label="子领域"
                header-align="center"
              /> -->
              <el-table-column
                prop="docNum"
                label="Number of Articles in three years"
                sortable='custom'
                :sort-orders="['descending']"
                header-align="center"
                align="center"
                width="270"
              >
                <template slot-scope="scope">
                  <!-- <el-avatar class="doc-num" size="small"> {{scope.row.docNum}} </el-avatar> -->
                  <el-button type="success" circle size="mini">{{scope.row.docNum}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="hindex"
                label="H-index"
                sortable='custom'
                :sort-orders="['descending']"
                header-align="center"
                align="center"
                width="100"
              >
                <template slot-scope="scope">
                  <!-- <el-avatar class="h-index" size="small"> {{scope.row.hindex}} </el-avatar> -->
                  <el-button type="warning" circle size="mini">{{scope.row.hindex}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="Best paper"
                prop="titletext"
                show-overflow-tooltip
                header-align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>

    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import ReportBreadcrumb from '@/components/report-breadcrumb'
import BarLine from '@/components/charts/bar-line'
import { reportApi } from '@/service'
export default {
  name: 'ReportExpert',

  components: {
    ReportBreadcrumb,
    BarLine
  },

  data () {
    return {
      current: '人工智能基础',
      currentTab: '0',
      sortBy: 'docNum',
      sortMethod: 'descending',
      dataSet: {
        columns: ['人工智能基础', '人机混合智能', '机器学习', '知识系统', '神经网络', '自然语言处理', '计算机视觉技术']
      },
      expertList: [],
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
          cnt: 119872,
          rate: 5
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2017,
          cnt: 125762,
          rate: 5
        },
        {
          domain: 'Fundamentals of Artificial Intelligence',
          year: 2018,
          cnt: 129423,
          rate: 3
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2016,
          cnt: 31661,
          rate: 5
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2017,
          cnt: 32891,
          rate: 4
        },
        {
          domain: 'Human Machine Hybrid Intelligence',
          year: 2018,
          cnt: 32954,
          rate: 1
        },
        {
          domain: 'Machine Learning',
          year: 2016,
          cnt: 147572,
          rate: 4
        },
        {
          domain: 'Machine Learning',
          year: 2017,
          cnt: 152702,
          rate: 3
        },
        {
          domain: 'Machine Learning',
          year: 2018,
          cnt: 155796,
          rate: 2
        },
        {
          domain: 'Knowledge System',
          year: 2016,
          cnt: 42469,
          rate: 2
        },
        {
          domain: 'Knowledge System',
          year: 2017,
          cnt: 43420,
          rate: 2
        },
        {
          domain: 'Knowledge System',
          year: 2018,
          cnt: 43916,
          rate: 1
        },
        {
          domain: 'Neural Network',
          year: 2016,
          cnt: 26191,
          rate: 3
        },
        {
          domain: 'Neural Network',
          year: 2017,
          cnt: 26899,
          rate: 3
        },
        {
          domain: 'Neural Network',
          year: 2018,
          cnt: 27317,
          rate: 2
        },
        {
          domain: 'NLP',
          year: 2016,
          cnt: 27569,
          rate: 10
        },
        {
          domain: 'NLP',
          year: 2017,
          cnt: 30334,
          rate: 10
        },
        {
          domain: 'NLP',
          year: 2018,
          cnt: 32645,
          rate: 8
        },
        {
          domain: 'Computer Vision',
          year: 2016,
          cnt: 60915,
          rate: 4
        },
        {
          domain: 'Computer Vision',
          year: 2017,
          cnt: 63342,
          rate: 4
        },
        {
          domain: 'Computer Vision',
          year: 2018,
          cnt: 65130,
          rate: 3
        }
      ]
    }
  },

  computed: {
    currentTabName () {
      return this.dataSet.columns[this.currentTab - 0]
    }
  },

  watch: {
    currentTab () {
      this.getExpertList()
    }
  },

  mounted() {
    this.getExpertList()
  },

  methods: {
    onSort (item) {
      const { prop, order } = item
      this.sortBy = prop
      this.sortMethod = order

      this.getExpertList()
    },

    async getExpertList () {
      const postData = {
        domain: this.currentTabName,
        sort: this.sortBy,
        order: this.sortMethod
      }
      this.expertList = await reportApi.QueryExpertList(postData)
    }
  }
}
</script>

<style lang="less" scoped>
 .report-expert-wrapper {
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

     .content {
       padding-bottom: 10px;

       .h-index {
         background: #E6A23C;
       }
       .doc-num {
         background: #909399;
       }
     }
   }

   /deep/ .el-radio {
     margin-right: 15px;
   }
 }
</style>
