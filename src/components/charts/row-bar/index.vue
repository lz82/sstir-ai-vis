<template>
  <div class="row-bar-wrapper">
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'

export default {
  name: 'RowBar',

  props: {
    showLengend: {
      type: Boolean,
      default: false
    },
    left: {
      type: String,
      required: true
    },
    showX: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    data1: {
      type: Array,
      required: true
    },
    data2: {
      type: Array,
      required: true
    },
    max: {
      type: Number
    }
  },

  data() {
    return {
      id: 'row-bar'
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
          text: this.title,
          left: 0,
          top: this.showLengend ? '45%' : '30%',
          textAlign: 'left'
        },
        color: ['#2477f5', '#669ff5'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['Artificial Intelligence', 'Non Artificial Intelligence'],
          show: this.showLengend,
          selectedMode: false
        },
        grid: {
          left: this.left,
          right: '10%',
          top: this.showLengend ? '25%' : '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            show: this.showX,
            splitLine: {
              show: false
            },
            max: this.max || 3800
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['2016', '2017', '2018'],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'Artificial Intelligence',
            type: 'bar',
            stack: 'year',
            data: this.data1,
            barWidth: 15,
            barGap: 10,
            barCategoryGap: 10,
            barMinHeight: 5
          },
          {
            name: 'Non Artificial Intelligence',
            type: 'bar',
            stack: 'year',
            data: this.data2
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
.row-bar-wrapper {
  .container {
    width: 1158px;
    height: 120px;
  }
}
</style>
