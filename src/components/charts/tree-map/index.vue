<template>
  <div class="tree-map-wrapper">
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'

export default {
  name: 'TreeMap',

  props: {
    chartData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      id: 'tree-map-chart'
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
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} 人'
        },
        series: [
          {
            type: 'treemap',
            width: '100%',
            height: '100%',
            top: '2%',
            roam: false, // 是否开启拖拽漫游（移动和缩放）
            nodeClick: false, // 点击节点后的行为,false无反应
            breadcrumb: {
              show: false
            },
            visibleMin: 3300,
            label: {
              // 描述了每个矩形中，文本标签的样式。
              // normal: {
              //   show: true,
              //   position: ['1%', '1%'],
              //   // formatter(params) {
              //   //   if (params.value > 100) {
              //   //     return '{big|aaaa}'
              //   //   } else {
              //   //     return '{small|bbbb}'
              //   //   }
              //   // },
              //   formatter: ['{big|{b}}'],
              //   rich: {
              //     big: {
              //       fontSize: 32,
              //       color: 'red'
              //     },
              //     small: {
              //       fontSize: 16
              //     }
              //   }
              // }
              formatter(data) {
                if (data.value > 100) {
                  return '{big|' + data.data.name + '}\n\n{big|' + data.value + '}'
                } else {
                  return '{small|' + data.data.name + '}\n{small|' + data.value + '}'
                }
              },
              rich: {
                big: {
                  color: '#FFF',
                  lineHeight: 20,
                  fontSize: 20,
                  align: 'center'
                },
                small: {
                  color: '#FFF',
                  lineHeight: 14,
                  fontSize: 12,
                  align: 'center'
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                },
                borderWidth: 1,
                borderColor: '#fff'
              },

              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: this.chartData
          }
        ]
      }
      const chart = echarts.init(document.getElementById(this.id))
      chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.tree-map-wrapper {
  .container {
    width: 1158px;
    height: 500px;
  }
}
</style>
