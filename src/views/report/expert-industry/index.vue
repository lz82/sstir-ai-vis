<template>
  <div class="report-expert-industry-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="全球人工智能应用专家行业分布" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <!-- <div class="header-wrapper">
          <h3 class="chart-title">全球专家行业分布</h3>
          <a href="./data/专家详情信息表字段.xlsx" download="全球专家领域分布数据.xlsx"
            ><i class="el-icon-download"
          /></a>
        </div> -->
        <h3 class="chart-title">全球人工智能应用专家行业分布</h3>
        <div class="chart-wrapper">
          <chart-map :legend="aiIndustry" :map-data="mapData" :pieces="pieces" />
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
        <h3 class="chart-title">全球人工智能应用专家行业分布</h3>
        <div class="tabs-wrapper">
          <el-tabs v-model="currentTab">
            <el-tab-pane
              v-for="domain in Object.keys(mapData)"
              :key="domain"
              :label="domain"
              :name="domain"
            />
          </el-tabs>
          <div class="space-10" />
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
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家领域分布</h3>
        </div>
        <div class="tabs-wrapper">
          <el-select v-model="currentNation" filterable placeholder="请选择" style="width: 250px;">
            <el-option
              v-for="item in Object.keys(nationData)"
              :key="item"
              :label="convertZh(item)"
              :value="item"
            >
              <span style="float: left">{{ getOptionLabel(item) }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item }}</span>
            </el-option>
          </el-select>
          <el-tooltip
            class="item"
            effect="dark"
            content="可输入国家/地区中文名称模糊查询"
            placement="top-start"
          >
            <i class="el-icon-question" style="margin-left: 10px; cursor: pointer;"></i>
          </el-tooltip>
          <div class="chart">
            <chart-pie v-if="currentNation" :legend="currentLegend" :chart-data="currentPieData" />
          </div>
        </div>
      </el-card>

      <div class="space-10" />
    </div>
  </div>
</template>

<script>
import ChartMap from '@/components/charts/map'
import AI_INDUSTRY from '@/utils/constant'
import mapData from './data/data'
import ChartPie from '@/components/charts/pie'
import worldZh from '@/utils/world-zh'

export default {
  name: 'ReportExpertIndustry',

  components: {
    ChartMap,
    ChartPie
  },

  data() {
    return {
      aiIndustry: AI_INDUSTRY,
      mapData: mapData,
      currentTab: '',
      pieces: [
        {
          gte: 1000,
          label: `> 1000 人`,
          color: '#8c0d0d'
        },
        {
          gte: 500,
          lt: 999,
          label: `500 - 999 人`,
          color: '#cc2928'
        },
        {
          gte: 50,
          lt: 499,
          label: `50 - 499 人`,
          color: '#ff7b69'
        },
        {
          gte: 1,
          lt: 49,
          label: `1 - 49 人`,
          color: '#ffaa85'
        }
      ],
      nations: [],
      nationData: {},
      currentNation: ''
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
    },

    currentLegend() {
      const temp = this.nationData[this.currentNation]
      if (temp) {
        return temp.map((item) => item.name)
      } else {
        return []
      }
    },

    currentPieData() {
      const temp = this.nationData[this.currentNation]
      return temp || []
    }
  },

  watch: {
    currentTab() {
      this.$refs.tbl.bodyWrapper.scrollTop = 0
    }
  },

  mounted() {
    this.currentTab = Object.keys(this.mapData)[0]
    this.getNationData()
  },

  methods: {
    convertZh(data) {
      return worldZh[data]
    },

    getNationData() {
      const all = mapData['全部']
      all.forEach((n) => {
        this.nations.push(n.name)
      })
      this.nations.forEach((nation) => {
        Object.keys(mapData).forEach((domain) => {
          if (domain !== '全部') {
            const temp = mapData[domain].find((item) => item.name === nation)
            if (temp) {
              // const nationZh = this.convertZh(nation)
              // if (!this.nationData[nationZh]) {
              //   this.nationData[nationZh] = []
              // }
              // this.nationData[nationZh].push({
              //   name: domain,
              //   value: temp.value
              // })
              if (!this.nationData[nation]) {
                this.nationData[nation] = []
              }
              this.nationData[nation].push({
                name: domain,
                value: temp.value
              })
            }
          }
        })
      })
      this.currentNation = this.nations[0]
    },

    getOptionLabel(name) {
      const temp = mapData['全部'].find(item => item.name === name)
      if (temp) {
        return `${this.convertZh(name)} (${temp.value})`
      } else {
        return `${this.convertZh(name)} (0)`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.report-expert-industry-wrapper {
  .container {
    .chart-title {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      position: relative;
      padding-left: 10px;

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

    .tabs-wrapper {
      /deep/ .el-table__header {
        tr,
        th {
          background: #373d44 !important;
          color: #fff;
        }
      }
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
