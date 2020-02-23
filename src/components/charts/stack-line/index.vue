<template>
  <div class="stack-line-wrapper">
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'

export default {
  name: 'StackLine',

  props: {
    legend: {
      type: Array,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      id: 'stack-line-chart'
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
        title: {
          text: 'The quantity growth of Investment in the past three years',
          bottom: 0,
          left: '25%'
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
        tooltip: {
          trigger: 'axis',
          position: ['35%', 0]
        },
        legend: {
          data: this.legend,
          type: 'scroll',
          left: 30,
          right: 30,
          padding: [0, 20, 0, 0]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2016', '2017', '2018']
        },
        yAxis: {
          type: 'value'
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
.stack-line-wrapper {
  .container {
    width: 750px;
    height: 460px;
  }
}
</style>
