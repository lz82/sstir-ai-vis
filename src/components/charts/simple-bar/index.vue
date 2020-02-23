<template>
  <div class="simple-bar-wrapper">
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'

export default {
  name: 'SimpleBar',

  props: {
    legend: {
      type: Array,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    },
    y: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      id: 'simple-bar-chart'
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
        color: ['#2477f5'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // top: 100,
          data: this.legend,
          show: true
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          max: 50000000
        },
        yAxis: {
          type: 'category',
          data: this.y
        },
        series: [
          {
            type: 'bar',
            name: 'Quota(10000 yuan)',
            data: this.chartData
          }
        ]
      }
      console.log(option)
      const chart = echarts.init(document.getElementById(this.id))
      chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.simple-bar-wrapper {
  .container {
    width: 590px;
    height: 400px;
  }
}
</style>
