<template>
  <div class="map-wrapper">
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'
import 'echarts/map/js/world'
import worldPoint from '@/utils/world-point'
import worldZh from '@/utils/world-zh'

export default {
  name: 'Map',

  data() {
    return {
      id: '',
      mapData: [
        {
          name: 'China',
          value: 92
        },
        {
          name: 'United States',
          value: 88
        },
        {
          name: 'Russia',
          value: 78
        },
        {
          name: 'Switzerland',
          value: 72
        }
      ],
      formatData: []
    }
  },

  created() {
    this.id = uuid()
  },

  mounted() {
    this.$nextTick(() => {
      this.formatData = this.convertData(this.mapData)
      this.initData()
    })
  },

  methods: {
    initData() {
      const option = {
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['全部', '机器学习', 'NLP'],
          selectedMode: 'single'
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: !0,
          text: ['高', '低'],
          pieces: [
            {
              gte: 90,
              lt: 100,
              label: '> 90 人',
              color: '#7f1100'
            },
            {
              gte: 80,
              lt: 90,
              label: '80 - 90 人',
              color: '#ff5428'
            },
            {
              gte: 70,
              lt: 80,
              label: '70 - 80 人',
              color: '#ff8c71'
            }
          ],
          show: !0
        },
        backgroundColor: '#eaeaea',
        tooltip: {
          trigger: 'item'
        },
        geo: {
          map: 'world',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              borderColor: '#f6f6f6',
              borderWidth: 1,
              areaColor: '#f6f6f6'
            },
            emphasis: {
              areaColor: '#f6f6f6'
            }
          }
        },
        series: [
          {
            type: 'map',
            name: '全部',
            map: 'world',
            geoIndex: 1,
            tooltip: {
              show: true,
              formatter: (args) => {
                const name = this.convertZh(args.name)
                if (args.data) {
                  return '专家数量<br />' + name + ' : ' + args.data.value
                } else {
                  return name
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#eaeaea',
                borderWidth: 1,
                areaColor: '#fff',
                fontWeightL: 700
              },
              emphasis: {
                areaColor: 'rgba(0,0,0, 0.2)',
                label: {
                  show: false
                }
              }
            },
            label: {
              show: true,
              formatter: (args) => {
                const name = this.convertZh(args.name)
                const temp = this.mapData.find((item) => item.name === args.name)
                return temp ? name : ''
              }
            },
            data: this.mapData
          },
          {
            type: 'map',
            name: '机器学习',
            map: 'world',
            geoIndex: 1,
            tooltip: {
              show: true,
              formatter: (args) => {
                const name = this.convertZh(args.name)
                if (args.data) {
                  return '专家数量<br />' + name + ' : ' + args.data.value
                } else {
                  return name
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#eaeaea',
                borderWidth: 1,
                areaColor: '#fff',
                fontWeightL: 700
              },
              emphasis: {
                areaColor: 'rgba(0,0,0, 0.2)',
                label: {
                  show: false
                }
              }
            },
            label: {
              show: true,
              formatter: (args) => {
                const name = this.convertZh(args.name)
                const temp = this.mapData.find((item) => item.name === args.name)
                return temp ? name : ''
              }
            },
            data: this.mapData
          },
          {
            type: 'map',
            name: 'NLP',
            map: 'world',
            geoIndex: 1,
            tooltip: {
              show: true,
              formatter: (args) => {
                const name = this.convertZh(args.name)
                if (args.data) {
                  return '专家数量<br />' + name + ' : ' + args.data.value
                } else {
                  return name
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#eaeaea',
                borderWidth: 1,
                areaColor: '#fff',
                fontWeightL: 700
              },
              emphasis: {
                areaColor: 'rgba(0,0,0, 0.2)',
                label: {
                  show: false
                }
              }
            },
            label: {
              show: true,
              formatter: (args) => {
                const name = this.convertZh(args.name)
                const temp = this.mapData.find((item) => item.name === args.name)
                return temp ? name : ''
              }
            },
            data: this.mapData
          }
          // {
          //   name: '专家数量',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   symbol: 'circle',
          //   label: {
          //     show: true,
          //     formatter: (args) => {
          //       return args.name
          //     }
          //   },
          //   itemStyle: {
          //     show: false,
          //     normal: {
          //       show: false,
          //       color: '#5599E4'
          //     }
          //   },
          //   zlevel: 6,
          //   data: this.formatData,
          //   tooltip: {
          //     formatter: (args) => {
          //       return args.seriesName + '<br />' + args.name + ' : ' + args.value[2]
          //     }
          //   }
          // }
          // {
          //   name: '专家数量',
          //   type: 'effectScatter', // 散点图
          //   coordinateSystem: 'geo', // 使用地理坐标系
          //   hoverAnimation: 'false',
          //   legendHoverLink: 'false',
          //   rippleEffect: {
          //     period: 4,
          //     brushType: 'stroke',
          //     scale: 3
          //   },
          //   data: this.formatData,
          //   symbolSize: 8,
          //   itemStyle: {
          //     show: false,
          //     normal: {
          //       color: '#5599E4'
          //     }
          //   },
          //   zlevel: 1,
          //   label: {
          //     show: true,
          //     formatter: (args) => {
          //       return args.value[2] + '\n' + args.name
          //     },
          //     offset: [0, 30]
          //   }
          // }
        ]
      }
      const chart = echarts.init(document.getElementById(this.id))
      chart.setOption(option)
    },

    convertData(data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let geoCoord = worldPoint[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      // 有数据的地区的名称和value值
      return res
    },

    convertZh(data) {
      return worldZh[data]
    },

    converMapData(data) {}
  }
}
</script>

<style lang="less" scoped>
.map-wrapper {
  .container {
    width: 1150px;
    height: 650px;
  }
}
</style>
