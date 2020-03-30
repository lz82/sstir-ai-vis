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

  watch: {
    chartData() {
      this.initData()
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
        // color: [
        //   '#dd2c00',
        //   '#ff3d00',
        //   '#ff6e40',
        //   '#ff9e80',
        //   '#bf360c',
        //   '#d84315',
        //   '#e64a19',
        //   '#f4511e',
        //   '#ff5722',
        //   '#ff7043',
        //   '#ff8a65',
        //   '#ffab91',
        //   '#ffccbc',
        //   '#fbe9e7',
        //   '#ff5722'
        // ],
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
            label: {
              formatter: '{b}({c})'
            },
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
