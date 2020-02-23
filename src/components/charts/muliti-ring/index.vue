<template>
  <div class="muliti-ring-wrapper">
    <div :id="id" class="container"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import uuid from 'uuid/v4'
export default {
  name: 'MulitiRing',

  props: {
    source: {
      type: Array,
      required: true
    },
    dimension: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    },
    title: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      id: 'muliti-ring'
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
        title: this.title,
        dataset: {
          dimensions: this.dimension,
          source: this.source
        },
        legend: {
          type: 'scroll'
        },
        tooltip: {},
        series: this.series,
        color: [
          '#da3030',
          '#e95d44',
          '#f2aa34',
          '#2b465b',
          '#208e9b',
          '#38c2cc',
          '#c3e9d4'
        ]
      }
      const chart = echarts.init(document.getElementById(this.id))
      chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.muliti-ring-wrapper {
  .container {
    width: 1158px;
    height: 300px;
  }
}
</style>
