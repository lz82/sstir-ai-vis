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
            visibleMin: 2000,
            label: {
              // 描述了每个矩形中，文本标签的样式。
              normal: {
                show: true,
                position: ['1%', '1%']
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
    height: 400px;
  }
}
</style>
