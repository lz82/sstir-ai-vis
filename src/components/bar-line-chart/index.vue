<template>
  <div class="bar-line-chart-wrapper">
    <div class="radio">
      <el-radio-group v-model="current">
        <el-radio v-for="item in columns" :key="item" :label="item">{{item}}</el-radio>
      </el-radio-group>
    </div>
    <ve-histogram
      :xAxis="xAxis"
      :yAxis="yAxis"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: 'BarLineChart',

  props: {
    columns: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      current: this.columns[0],
      xAxis: [
        {
          type: 'category',
          data: ['2016年', '2017年', '2018年'],
          axisLine: {
            show: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '数量',
          min: 0,
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          name: '增速',
          min: this.min,
          max: this.max,
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '论文数量',
          type: 'bar',
          label: {
            show: true
          },
          barWidth: '50px',
          itemStyle: {
            color: '#409EFF'
          },
          data: []
        },
        {
          name: '增速',
          type: 'line',
          label: {
            show: true,
            formatter (item) {
              return (item.value * 100).toFixed(2) + '%'
            },
            color: '#000'
          },
          yAxisIndex: 1,
          lineStyle: {
            color: '#f2db13'
          },
          data: []
        }
      ]
    }
  },

  computed: {
    currentList () {
      return this.list.filter(item => item.domain === this.current).sort((a, b) => a.year < b.year)
    }
  },

  watch: {
    current () {
      this.series[0].data = this.getCurrentCnt()
      this.series[1].data = this.getCurrentRate()
    }
  },

  mounted () {
    this.series[0].data = this.getCurrentCnt()
    this.series[1].data = this.getCurrentRate()
  },

  methods: {
    getCurrentCnt () {
      let temp = []
      this.currentList.forEach(item => {
        temp.push(item.cnt)
      })
      return temp
    },

    getCurrentRate () {
      let temp = []
      this.currentList.forEach(item => {
        temp.push(item.rate)
      })
      return temp
    }
  }
}
</script>

<style lang="less" scoped>

</style>
