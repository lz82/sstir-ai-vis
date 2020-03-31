<template>
  <div class="report-expert-domain-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="全球人工智能顶尖科研专家领域分布" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家领域分布</h3>
          <a href="/data/excel/全球专家分布.xls" download="全球专家分布.xls" target="_blank"
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
          <h3 class="chart-title">全球人工智能顶尖科研专家领域分布</h3>
        </div>
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
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家领域分布</h3>
        </div>
        <div class="tabs-wrapper">
          <div class="select-wrapper">
            <div class="left">
              <el-select
                v-model="currentNation"
                filterable
                placeholder="请选择"
                style="width: 250px;"
              >
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
            </div>
            <div class="right">
              <i class="el-icon-notebook-2"  :class="{ active: !nationMode }" />&nbsp;
              <el-switch v-model="nationMode" active-text="图表" inactive-text="表格"> </el-switch
              >&nbsp;<i class="el-icon-pie-chart" :class="{ active: nationMode }" />
            </div>
          </div>

          <div v-if="nationMode" class="chart">
            <chart-pie v-if="currentNation" :legend="currentLegend" :chart-data="currentPieData" />
          </div>
          <div v-else class="table">
            <el-table ref="tbl" :data="currentPieData" stripe height="500">
              <el-table-column
                label="领域"
                prop="name"
                width="400px"
                header-align="center"
                align="center"
              />
              <el-table-column
                label="专家数量"
                prop="value"
                header-align="center"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>

      <div class="space-10" />

      <el-card style="margin-bottom: 20px;">
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家学历情况</h3>
          <a href="/data/excel/专家学历分布.xls" download="专家学历分布.xls" target="_blank"
            ><i class="el-icon-download"
          /></a>
        </div>
        <div class="chart-wrapper">
          <chart-bar :y-axis="eduDomain" :legend="degreeType" :chart-data="degreeData" />
        </div>
      </el-card>

      <div class="space-10" />

      <el-card style="margin-bottom: 20px;">
        <div class="header-wrapper">
          <h3 class="chart-title">全球人工智能顶尖科研专家领域占比</h3>
          <a href="/data/excel/专家领域分布.xls" download="专家领域分布.xls" target="_blank"
            ><i class="el-icon-download"
          /></a>
        </div>
        <div class="chart-wrapper">
          <!-- <chart-pie :legend="legendData" :chart-data="pieData" /> -->
          <chart-tree-map :chart-data="pieData" />
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
import ChartTreeMap from '@/components/charts/tree-map'
import { AI_DOMAIN, AI_DOMAIN_NO_ALL } from '@/utils/constant'
import expertDomainData from './data/data.json'
import domainData from './data/domain.json'
import eduData from './data/edu.json'
import worldZh from '@/utils/world-zh'

export default {
  name: 'ReportExpertDomain',

  components: {
    ChartMap,
    ChartBar,
    ChartPie,
    ChartTreeMap
  },

  data() {
    return {
      legendData: AI_DOMAIN,
      legendNoALlData: AI_DOMAIN_NO_ALL,
      mapData: expertDomainData,
      degreeType: ['博士', '非博士'],
      currentTab: '',
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
          data: []
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
          data: []
        }
      ],
      pieData: domainData,
      nations: [],
      nationData: {},
      currentNation: '',
      nationMode: true,
      eduDomain: []
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
    this.getChartData()
  },

  methods: {
    convertZh(data) {
      return worldZh[data]
    },

    getNationData() {
      const all = expertDomainData['全部']
      all.forEach((n) => {
        this.nations.push(n.name)
      })
      this.nations.forEach((nation) => {
        Object.keys(expertDomainData).forEach((domain) => {
          if (domain !== '全部') {
            const temp = expertDomainData[domain].find((item) => item.name === nation)
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
      const temp = expertDomainData['全部'].find((item) => item.name === name)
      if (temp) {
        return `${this.convertZh(name)} (${temp.value})`
      } else {
        return `${this.convertZh(name)} (0)`
      }
    },

    getChartData() {
      this.eduDomain = Object.keys(eduData).reverse()
      this.eduDomain.forEach(key => {
        console.log(key, eduData[key])
        this.degreeData[0].data.push(eduData[key][0].value)
        this.degreeData[1].data.push(eduData[key][1] ? eduData[key][1].value : 0)
      })
    }
  }
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

    .tabs-wrapper {
      margin: 10px;

      /deep/ .el-table__header {
        tr,
        th {
          background: #373d44 !important;
          color: #fff;
        }
      }

      .select-wrapper {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .right {
          display: flex;
          align-items: center;

          .active {
            color: #409EFF;
          }
        }
      }

      .table {
        margin-top: 20px;
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
