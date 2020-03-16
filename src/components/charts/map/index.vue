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

  props: {
    legend: {
      type: Array
    },
    mapData: {
      type: Object,
      required: true
    },
    unit: {
      type: String,
      default: '专家'
    },
    visualUnit: {
      type: String,
      default: '人'
    }
  },

  data() {
    return {
      id: '',
      formatData: []
    }
  },

  created() {
    this.id = uuid()
  },

  mounted() {
    this.$nextTick(() => {
      this.initData()
    })
  },

  methods: {
    initData() {
      const option = {
        legend: {
          orient: 'horizontal',
          type: 'scroll',
          left: 'left',
          data: this.legend,
          selectedMode: 'single',
          textStyle: {
            color: '#fff'
          },
          pageIconColor: '#fff'
        },
        color: [
          '#967adc',
          '#f6bb42',
          '#3dd5ff',
          '#8cc152',
          '#e7affe',
          '#3bafda',
          '#20cec8',
          '#8dd1e1',
          '#9cacf1'
        ],
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: !0,
          text: ['高', '低'],
          textStyle: {
            color: '#fff'
          },
          pieces: [
            {
              gte: 100,
              label: `> 100 ${this.visualUnit}`,
              color: '#8c0d0d'
            },
            {
              gte: 30,
              lt: 100,
              label: `30 - 99 ${this.visualUnit}`,
              color: '#ff7b69'
            },
            {
              gte: 1,
              lt: 30,
              label: `0 - 29 ${this.visualUnit}`,
              color: '#ffaa85'
            }
          ],
          show: !0
        },
        backgroundColor: '#404a59',
        tooltip: {
          trigger: 'item'
        },
        series: Object.keys(this.mapData).map((domain) => {
          return {
            type: 'map',
            name: domain,
            roam: true,
            scaleLimit: {
              min: 1,
              max: 3
            },
            // right: 50,
            map: 'world',
            geoIndex: 1,
            tooltip: {
              show: true,
              formatter: (args) => {
                const name = this.convertZh(args.name)
                if (args.data) {
                  return this.unit + '数量<br />' + name + ' : ' + args.data.value
                } else {
                  return name
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#404a59',
                borderWidth: 1,
                areaColor: '#323c48',
                fontWeightL: 700
              },
              emphasis: {
                areaColor: 'rgba(255,255,255, 0.5)',
                label: {
                  show: false
                }
              }
            },
            label: {
              show: true,
              color: '#fff',
              formatter: (args) => {
                const name = this.convertZh(args.name)
                const temp = this.mapData[domain].find((item) => item.name === args.name)
                return temp ? name : ''
              }
            },
            data: this.mapData[domain]
          }
        })
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
