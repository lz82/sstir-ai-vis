<template>
  <div class="bar-wrapper">
    <div :id="id" class="container" :style="{height: height}"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'

export default {
  name: 'BarLine',

  props: {
    yAxis: {
      type: Array,
      required: true
    },
    legend: {
      type: Array,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: '500px'
    }
  },

  data() {
    return {
      id: ''
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
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: [
          '#dd2c00',
          '#ffab91'
        ],
        legend: {
          data: this.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
          // max:1050
        },
        yAxis: {
          type: 'category',
          data: this.yAxis
        },
        series: this.chartData
      }
      const chart = echarts.init(document.getElementById(this.id))
      chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.bar-wrapper {
  .container {
    width: 1158px;
  }
}
</style>
