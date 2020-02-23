<template>
  <div class="expert-detail-wrapper">
    <div class="bread">
      <breadcrumb
        type="Expert"
      />
    </div>
    <div class="basic-container">
      <div class="info">
        <div class="avatar">
          <img :src="pic" alt="">
        </div>
        <div class="intro">
          <h4 class="name">{{name}}</h4>
          <p class="subject-e">{{institution}}</p>
          <!-- <p class="subject">{{subjectArea}}</p> -->
          <p class="subject">Computer Science</p>
          <p class="nation">{{country}}</p>
        </div>
      </div>
      <div class="cnt">
        <div class="cnt-info">
          <p class="num">{{totalIssues}}</p>
          <p class="type">Number of Articles Published</p>
        </div>
        <div class="cnt-info">
          <p class="num">{{totalCitations}}</p>
          <p class="type">Total Citation Frequency</p>
        </div>
        <div class="cnt-info">
          <p class="num">{{top1Citations | percentFormat}}</p>
          <p class="type">Top 1% High Cited Articles </p>
        </div>
        <div class="cnt-info">
          <p class="num">{{hIndex}}</p>
          <p class="type">H-index</p>
        </div>
      </div>
    </div>
    <div class="report-container">
      <!-- 期刊发文数占比 -->
      <div class="report">
        <!-- <h3>期刊发文数占比</h3> -->
        <ve-ring
          :data="roseData"
          :settings="roseSettings"
          :legend-visible="true"
          :tooltip-visible="true"
          :tooltip="roseTooltip"
          width="100%"
          height="400px"
          :legend="roseLegend"
        />
        <h3>Percentage of Journal Articles in All Publishes</h3>
      </div>
      <!-- 文章被引情况 -->
      <div class="report">
        <!-- <h3>文章被引情况</h3> -->
        <!-- <ve-waterfall
          :data="funnelData"
          :settings="funnelSetting"
          :legend-visible="true"
          width="100%"
          height="400px"
        /> -->
        <ve-pie
          :series="pieExtend.series"
          :legend="pieExtend.legend"
          :tooltip-visible="false"
          width="100%"
          height="400px"
        />
        <h3>the Citation of Articles</h3>
      </div>
      <!-- 重点学科匹配度 -->
      <div v-if="radarOption.indicator.length > 2" class="important-subject">
        <!-- <h3>重点学科匹配度</h3> -->
        <ve-radar
          :radar="radarOption"
          :series="radarSeriesOption"
          :legend-visible="false"
          :tooltip-visible="false"
          width="100%"
          height="400px"
        />
        <h3>Matching Degree of Key Disciplines</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb'
import { detailApi } from '@/service'
import iconAll from './img/all.png'
import icon10 from './img/10.png'
import icon1 from './img/1.png'

const placeHolderStyle = {
  normal: {
    color: 'rgba(0,0,0,0)',
    label: { show: false },
    labelLine: { show: false }
  },
  emphasis: {
    color: 'rgba(0,0,0,0)'
  }
}

export default {
  name: 'ExpertDetail',

  components: {
    Breadcrumb
  },

  filters: {
    percentFormat (val) {
      return (val * 100).toFixed(2) + '%'
    }
  },

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      pic: '',
      name: '',
      institution: '', // 机构
      subjectArea: '', // 学科领域
      country: '', // 国籍
      totalIssues: 0, // 总发文数
      totalCitations: 0, // 总被引数
      top1Citations: 0, // 前1%高被引
      hIndex: 0, // H指数
      radarOption: {
        radius: '100',
        indicator: []
        // name: {
        //   formatter (val) {
        //     if (val.length > 8) {
        //       return `${val.substring(0, 8)}\n${val.substring(9)}`
        //     } else {
        //       return val
        //     }
        //   }
        // }
      },
      radarSeriesOption: {
        type: 'radar',
        areaStyle: {
          color: '#4CE3C4'
        },
        data: [{
          value: []
        }]
      },
      roseData: {
        columns: ['期刊', '数量'],
        rows: []
      },
      roseSettings: {
        roseType: 'radius',
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      roseLegend: {
        orient: 'vertical',
        left: 0,
        top: 0,
        formatter (obj) {
          const temp = JSON.parse(obj)
          if (temp.journalImpactFactor) {
            return `${temp.docNum} SCI:${temp.journalImpactFactor}`
          } else {
            return `${temp.docNum} --`
          }
        },
        tooltip: {
          show: true,
          formatter (obj) {
            const temp = JSON.parse(obj.name)
            return temp.sourcetitle
          }
        }
      },
      roseTooltip: {
        formatter (obj) {
          const temp = JSON.parse(obj.data.name)
          let ret = `${temp.sourcetitle}: ${temp.docNum};`
          if (temp.journalImpactFactor) {
            ret += `SCI: ${temp.journalImpactFactor}`
          }
          return ret
        }
      },
      pieExtend: {
        data: {
          total: 0,
          n10: 0,
          n1: 0
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: [{
            name: 'Number of Articles Published',
            icon: 'image://' + iconAll
          },
          {
            name: 'Top 10% Highly Cited Articles',
            icon: 'image://' + icon10
          },
          {
            name: 'Top 1% Highly Cited Articles',
            icon: 'image://' + icon1
          }]
        },
        series: [
          {
            name: 'Top 1% Highly Cited Articles',
            type: 'pie',
            selectedMode: 'single',
            radius: [40, 60],
            clockWise: false,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false },
                shadowColor: 'rgba(40, 40, 40, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: function (obj) {
                  return obj.percent + '%'
                }
              }
            },

            data: [
              { name: 'Top 1% Highly Cited Articles',
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#59B1F0'
                  }
                } },
              { name: 'other', value: 83, itemStyle: placeHolderStyle }
            ]
          },
          {
            name: 'Top 10% Highly Cited Articles',
            type: 'pie',
            // center: ['45%', '48%'],
            radius: [60, 80],
            clockWise: false,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false },
                shadowColor: 'rgba(40, 40, 40, 0.5)'
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 30,
                length2: 20
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside',
                formatter: function (obj) {
                  return obj.percent + '%'
                }
              }
            },

            data: [
              { name: 'Top 10% Highly Cited Articles',
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#B6A2DF'
                  }
                } },
              { name: 'other', value: 0, itemStyle: placeHolderStyle }
            ]
          },
          {
            name: 'Number of Articles Published',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: true,
                length: 30,
                length2: 20
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside',
                formatter: '{c}'
              }
            },
            radius: [80, 100],
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false },
                shadowColor: 'rgba(40, 40, 40, 0.5)'
              }
            },

            data: [
              { name: 'Number of Articles Published',
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#2DC7C9'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },

  mounted () {
    this.initData()
  },

  methods: {
    async initData () {
      const detail = await detailApi.GetExpertInfoById(this.id)
      this.pic = detail.headImg
      this.name = detail.name
      // 机构
      this.institution = detail.institution
      // 学科领域
      this.subjectArea = detail.subjectArea
      // 国籍
      this.country = detail.country
      // totalIssues
      this.totalIssues = detail.totalIssues
      // totalCitations
      this.totalCitations = detail.totalCitations
      // top1Citations
      this.top1Citations = detail.top1Citations
      // H指数
      this.hIndex = detail.hIndex

      // 玫瑰图
      if (detail.journalSend) {
        detail.journalSend.forEach(item => {
          this.roseData.rows.push({
            // '期刊': `${item.sourcetitle}|${item.journalImpactFactor}`,
            '期刊': JSON.stringify(item),
            '数量': item.docNum
          })
        })
      }
      // 雷达图
      if (detail.subjectMatch) {
        detail.subjectMatch.forEach(item => {
          this.radarOption.indicator.push({
            name: item.descriptionEh,
            max: 100
          })
          this.radarSeriesOption.data[0].value.push(item.ratio)
        })
      }

      if (detail.citedSituation) {
        this.pieExtend.data.total = detail.citedSituation.totalIssues
        this.pieExtend.data.n10 = detail.citedSituation.number10
        this.pieExtend.data.n1 = detail.citedSituation.number1

        // all
        this.pieExtend.series[2].data[0].value = detail.citedSituation.totalIssues

        // 10
        this.pieExtend.series[1].data[0].value = detail.citedSituation.number10
        this.pieExtend.series[1].data[1].value = detail.citedSituation.totalIssues - detail.citedSituation.number10

        // 1
        this.pieExtend.series[0].data[0].value = detail.citedSituation.number1
        this.pieExtend.series[0].data[1].value = detail.citedSituation.totalIssues - detail.citedSituation.number1
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';

  .expert-detail-wrapper {
     .bread {
      margin: 10px 0;
    }

    .basic-container {
      margin: 35px 0;
      background: #fff;
      border: solid 1px @borderColor;
      border-radius: 5px;
      width: 950px;
      height: 150px;
      position: relative;
      display: flex;
      flex-flow: row nowrap;

      .info {
        position: relative;
        flex: 1 0 350px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding-left: 15px;
        .avatar {
          width: 91px;
          height: 102px;
          img {
            width: 91px;
            height: 102px;
            object-fit: cover;
          }
        }
        .intro {
          padding-left: 15px;
          display: flex;
          flex-flow: column nowrap;
          .name {
            font-size: 20px;
            font-weight: 700;
            padding-bottom: 20px;
            color: #000;
          }
          .subject-e {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
            padding-bottom: 10px;
          }

          .subject {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
            padding-bottom: 10px;
          }

          .nation {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
          }
        }

        &:after {
          position: absolute;
          right: 0;
          top: 35px;
          content: '';
          width: 1px;
          height: 80px;
          background: @borderColor;
        }
      }

      .cnt {
        flex: 0 0 450px;
        display: flex;
        padding: 20px 0;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
        .cnt-info {
          flex: 0 0 50%;
          text-align: center;
          .num {
            font-size: 18px;
            color: #000;
            padding-bottom: 8px;
          }
          .type {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }

    .report-container {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      .important-subject{
          width: @contentWidth;
          h3 {
            font-size: 24px;
            text-align: center;
            margin-bottom: 30px;
          }
      }
      .report {
        flex: 0 0 50%;
        height: 450px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;

        h3 {
          font-size: 24px;
          text-align: center;
        }
      }
    }
  }
</style>
