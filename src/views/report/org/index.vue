<template>
  <div class="report-org-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="全球人工智能科研和研发机构分布" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <!-- <div class="header-wrapper">
          <h3 class="chart-title">全球专家行业分布</h3>
          <a href="./data/专家详情信息表字段.xlsx" download="全球专家领域分布数据.xlsx"
            ><i class="el-icon-download"
          /></a>
        </div> -->
        <h3 class="chart-title">全球人工智能科研和研发机构分布</h3>
        <div class="chart-wrapper">
          <chart-map
            :legend="orgType"
            :map-data="mapData"
            unit="机构"
            visual-unit="家"
            :pieces="pieces"
          />
        </div>
      </el-card>
      <div class="space-10" />

      <el-card style="margin-bottom: 20px;">
        <!-- <div class="header-wrapper">
          <h3 class="chart-title">全球专家行业分布</h3>
          <a href="./data/专家详情信息表字段.xlsx" download="全球专家领域分布数据.xlsx"
            ><i class="el-icon-download"
          /></a>
        </div> -->
        <h3 class="chart-title">全球人工智能科研和研发机构分布</h3>
        <div class="tabs-wrapper">
          <el-tabs v-model="currentTab">
            <el-tab-pane
              v-for="domain in Object.keys(mapData)"
              :key="domain"
              :label="domain"
              :name="domain"
            />
          </el-tabs>
          <el-table ref="tbl" :data="currentTbl" stripe height="500">
            <el-table-column
              label="国家/地区"
              prop="name"
              width="400px"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                {{ convertZh(scope.row.name) }}
              </template>
            </el-table-column>
            <el-table-column
              label="专家数量"
              prop="value"
              header-align="center"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-card>
      <div class="space-10" />

      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">全球人工智能科研和研发机构排行</h3>
        <div class="chart-wrapper">
          <el-table :data="rankData" max-height="540">
            <el-table-column label="排名" width="90px" header-align="center" align="center">
              <template slot-scope="scope">
                <span :class="'rank' + ' ' + getRank(scope.$index)">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="机构名称"
              prop="org"
              header-align="center"
              align="center"
              width="750px"
            />
            <el-table-column
              label="专家数量"
              prop="experts_quatity"
              header-align="center"
              align="center"
            />
            <el-table-column label="国家/地区" prop="nation" header-align="center" align="center">
              <template slot-scope="scope">
                {{ convertZh(scope.row.nation) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <div class="space-10" />
    </div>
  </div>
</template>

<script>
import ChartMap from '@/components/charts/map'
import mapData from './data/map-data'
import rankData from './data/rank'
import worldZh from '@/utils/world-zh'

export default {
  name: 'ReportOrg',

  components: {
    ChartMap
  },

  data() {
    return {
      orgType: ['全部', '院校', '非院校'],
      currentTab: '',
      mapData: mapData,
      rankData: rankData,
      pieces: [
        {
          gte: 100,
          label: `> 100 家`,
          color: '#8c0d0d'
        },
        {
          gte: 30,
          lt: 100,
          label: `30 - 99 家`,
          color: '#ff7b69'
        },
        {
          gte: 1,
          lt: 30,
          label: `0 - 29 家`,
          color: '#ffaa85'
        }
      ]
    }
  },

  computed: {
    currentTbl() {
      const temp = this.mapData[this.currentTab]
      if (temp) {
        return temp.sort((a, b) => {
          return b.value - a.value
        })
      } else {
        return []
      }
    }
  },

  watch: {
    currentTab() {
      this.$refs.tbl.bodyWrapper.scrollTop = 0
    }
  },

  mounted() {
    this.currentTab = Object.keys(this.mapData)[0]
  },

  methods: {
    convertZh(data) {
      return worldZh[data]
    },

    getRank(index) {
      switch (index) {
        default:
          return ''
        case 0:
          return 'no-1'
        case 1:
          return 'no-2'
        case 2:
          return 'no-3'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.report-org-wrapper {
  .container {
    .chart-title {
      font-size: 16px;
      font-weight: 600;
      position: relative;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;

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

    /deep/ .el-table__header {
      tr,
      th {
        background: #373d44 !important;
        color: #fff;
      }
    }

    .rank {
      display: inline-block;
      background: #c3c3c3;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 30px;
    }

    .no-1 {
      background: #fb6846;
    }

    .no-2 {
      background: #fb9b46;
    }

    .no-3 {
      background: #fbd746;
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
