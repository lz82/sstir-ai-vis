<template>
  <div class="knowledge-graph-wrapper">
    <div class="title">
      <span class="icon">
        <img :src="icon" alt="">
      </span>
      <span class="word">Knowledge Graph</span>
    </div>
    <div class="svg"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import icon from '@/assets/odps-data.png'
export default {
  name: 'ResultGraph',

  props: {
    keyword: {
      type: String
    },
    nodes: {
      type: Array,
      required: true
    },
    links: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      icon: icon,
      forceSimulation: null,
      svg: null,
      svgW: 790,
      svgH: 400
    }
  },

  computed: {
    nodeId () {
      if (this.links.length && this.links[0].source) {
        return this.links[0].source.id
      } else {
        return this.nodes[0].id
      }
    }
  },

  watch: {
    nodes () {
      this.$nextTick(() => {
        document.querySelector('svg').remove()
        this.initData()
      })
    }
  },

  mounted () {
    this.initData()
  },

  methods: {
    initData () {
      this.initSvgContainer()
      this.initForceSimulation()
      this.drawSvg()
    },

    initForceSimulation () {
      const padding = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }

      this.svg = d3.select('.svg')
        .append('svg')
        .attr('width', this.svgW)
        .attr('height', this.svgH)
        .append('g')
        .attr('transform', `translate(${padding.top}, ${padding.left})`)
    },

    initSvgContainer () {
      // 力导向图
      this.forceSimulation = d3.forceSimulation()
        .alpha(0.01) // 活力  渲染之后再自动动多久
        .force('link', d3.forceLink().id(data => data.id).distance(data => {
          return 100 * data.target.value
        })) // 映射id & 线的长度
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.svgW / 2, this.svgH / 2.2))
        .force('collide', d3.forceCollide(d => {
          // 两个球是固定中心词会有重叠问题
          if (d.name === this.keyword && this.nodes.length > 4) {
            d.fx = this.svgW / 2 // 设置特定节点固定x坐标
            d.fy = this.svgH / 2
          }
          return 50 * d.value + 5
        }
        ))
    },

    drawSvg () {
      this.forceSimulation.nodes(this.nodes)
        .on('tick', function () {
          edges.attr('x1', data => {
            return data.source.x
          })
            .attr('y1', data => data.source.y)
            .attr('x2', data => data.target.x)
            .attr('y2', data => data.target.y)

          gs.attr('transform', data => {
            return `translate(${data.x}, ${data.y})`
          })
        })

      this.forceSimulation.force('link')
        .links(this.links)

      // 绘制边
      const edges = this.svg.append('g')
        .selectAll('line')
        .data(this.links)
        .enter()
        .append('line')
        .attr('stroke', (data, index) => {
          return '#f1f1f1'
        })
        .attr('stroke-width', '2px')
        // .attr('stroke-opacity', 0.8)

      const gs = this.svg.selectAll('.node')
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (data, index) => {
          return `translate(${data.x}, ${data.y})`
        })
        .call(d3.drag()
          .on('start', this.started)
          .on('drag', this.dragged)
          .on('end', this.ended)
        )
      gs.append('circle')
        .attr('r', data => data.name === this.keyword ? 50 : 20 * (data.value + 1))
        .attr('fill', data => data.name === this.keyword ? '#9efff9' : this.calcColor(data.type))
        // .attr('fill-opacity', 0.8)
        .attr('style', 'cursor: pointer;')
        .on('click', () => {
          this.jump2Detail()
        })
      gs.append('text')
        // .text(data => data.name)
        .attr('style', 'opacity: 0.6; cursor: pointer; text-anchor: middle;')
        .selectAll('tspan')
        .data(d => d.name ? d.name.split(' ') : '')
        .join('tspan')
        .attr('x', 0)
        .attr('y', (d, i, nodes) => {
          if (nodes) {
            return `${i - nodes.length / 2 + 0.8}em`
          } else {
            return `0em`
          }
        })
        .text(data => data)
        .on('click', () => {
          this.jump2Detail()
        })
    },

    started (d) {
      if (!d3.event.active) {
        this.forceSimulation.alphaTarget(0.8).restart()
      }
      d.fx = d.x
      d.fy = d.y
    },

    dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    },

    ended (d) {
      if (!d3.event.active) {
        this.forceSimulation.alphaTarget(0)
      }
      d.fx = null
      d.fy = null
    },

    jump2Detail () {
      // this.$router.push(`/graph/${this.$route.params.searchKey}`)
      this.$router.push({
        path: `/graph/${this.nodeId}`,
        query: {
          keyword: this.keyword
        }
      })
    },

    calcColor (type) {
      switch (type) {
        case 'scholar':
          return '#a5dcff'
        case 'keyword':
          return '#9effd7'
        case 'affiliation':
          return '#ffd7b3'
        default:
          return '#a5dcff'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

  .knowledge-graph-wrapper {
    border-radius: 5px;
    width: 100%;
    height: 450px;
    border: solid 1px @borderColor;
    border-radius: 5px;
    .title {
      padding: 20px 0 0 20px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .icon {
        height: 18px;
        padding-right: 10px;
      }
    }
  }

  .node {
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

</style>
