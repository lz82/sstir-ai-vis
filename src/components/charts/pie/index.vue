<template>
  <div class="pie-wrapper">
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'

export default {
  name: 'Pie',

  props: {
    legend: {
      type: Array,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    },
    field: {
      type: String,
      default: '专家数量'
    }
  },

  data() {
    return {
      id: 'pie-chart'
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
      const localLegend = JSON.parse(JSON.stringify(this.legend)).reverse()

      const option = {
        tooltip: {
          trigger: 'item',
          position: 'inside'
        },
        color: [
          '#f02020',
          '#f6852a',
          '#f7bb2a',
          '#a7f421',
          '#24ec32',
          '#34eec4',
          '#26c5e7',
          '#308cda',
          '#8d7cf4',
          '#a047f2',
          '#c021f4',
          '#f62bac',
          '#2b465b',
          '#208e9b',
          '#38c2cc',
          '#c3e9d4'
        ],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 25,
          // top: 5,
          bottom: 5,
          data: localLegend
        },
        series: [
          {
            name: '专家数量',
            type: 'pie',
            radius: '60%',
            center: ['40%', '45%'],
            data: this.chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
.pie-wrapper {
  .container {
    width: 1158px;
    height: 400px;
  }
}
</style>
