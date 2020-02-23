<template>
  <div class="bar-line-wrapper">
    <div class="radio">
      <el-radio-group v-if="filters" v-model="currentFilter">
        <el-radio v-for="item in filters" :key="item" :label="item">{{item}}</el-radio>
      </el-radio-group>
    </div>
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import echarts from 'echarts'

export default {
  name: 'BarLine',

  props: {
    filters: {
      type: Array
    },
    source: {
      type: Array,
      required: true
    },
    min1: {
      type: Number
    },
    max1: {
      type: Number
    },
    min2: {
      type: Number
    },
    max2: {
      type: Number
    }
  },

  data() {
    return {
      id: 'bar-line',
      currentFilter: this.filters && this.filters[0]
    }
  },

  computed: {
    currentList() {
      return this.source
        .filter((item) => item.domain === this.currentFilter)
        .sort((a, b) => a.year < b.year)
    }
  },

  watch: {
    currentFilter() {
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
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          // formatter: '{b}<br /> {a}: {c}<br />{a1}: {c1}'
          formatter: val => {
            return `${val[0].name}<br />
                    ${val[0].marker}&nbsp;${val[0].seriesName}:&nbsp;${val[0].value}<br />
                    ${val[1].marker}&nbsp;${val[1].seriesName}:&nbsp;${val[1].value}%`
          }
        },
        legend: {
          data: ['Count', 'Growth']
        },
        xAxis: [
          {
            type: 'category',
            data: ['2016', '2017', '2018'],
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Count',
            min: this.min1 || 0,
            max: this.max1 || 1400000,
            interval: 200000,
            show: false
          },
          {
            type: 'value',
            name: 'Growth',
            min: this.min2 || -10,
            max: this.max2 || 12,
            interval: 2,
            show: false
          }
        ],
        series: [
          {
            name: 'Count',
            type: 'bar',
            itemStyle: {
              color: '#2477f5'
            },
            barWidth: 30,
            label: {
              show: true,
              position: 'top'
            },
            data: this.getCurrentCnt()
          },
          {
            name: 'Growth',
            yAxisIndex: 1,
            type: 'line',
            itemStyle: {
              color: '#249af5'
            },
            label: {
              show: true,
              formatter: '{c} %'
            },
            data: this.getCurrentRate()
          }
        ]
      }
      const chart = echarts.init(document.getElementById(this.id))
      chart.setOption(option)
    },

    getCurrentCnt() {
      let temp = []
      this.currentList.forEach((item) => {
        temp.push(item.cnt)
      })
      return temp
    },

    getCurrentRate() {
      let temp = []
      this.currentList.forEach((item) => {
        temp.push(item.rate)
      })
      return temp
    }
  }
}
</script>

<style lang="less" scoped>
.bar-line-wrapper {
  .radio {
    padding: 10px 0 30px 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    /deep/ .el-radio {
      margin-right: 5px;
    }

    /deep/ .el-radio__label {
      padding-left: 5px;
    }
  }
  .container {
    width: 1158px;
    height: 300px;
  }
}
</style>
