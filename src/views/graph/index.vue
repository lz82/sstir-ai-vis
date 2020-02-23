<template>
  <div class="graph-wrapper">
    <!-- <header>
      <div class="header-container">
      </div>
    </header> -->

    <div class="breadcrumb">
      <breadcrumb
        type="Knowledge Graph"
      />
    </div>

    <div class="graph-container">
      <div ref="svg" class="svg">
      <svg id="svg" width="100%" height="100%"></svg>
    </div>
    <div v-if="links.length > 0" class="pannel">
      <el-card v-show="getRelatedWord().length > 0" class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">Related subject words</span>
        </div>
        <el-tag v-for="item in getRelatedWord()" :key="item" class="tag" type="info" @click="goSearch(item)">{{item}}</el-tag>
      </el-card>

      <el-card v-show="getRelatedExpert().length > 0" class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">Related Experts</span>
        </div>
        <el-tag v-for="item in getRelatedExpert()" :key="item" class="tag" type="info" @click="goSearch(item)">{{item}}</el-tag>
      </el-card>
    </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import Breadcrumb from '@/components/breadcrumb'
import { graphApi } from '@/service'

export default {
  name: 'Graph',

  components: {
    Breadcrumb
  },

  props: {
    searchKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      keyword: '',
      nodes: [],
      links: [],
      forceSimulation: null,
      currentWord: this.searchKey,
      svg: null,
      scale: false,
      width: 0,
      height: 0
    }
  },

  async mounted () {
    this.width = window.getComputedStyle(this.$refs.svg).width.replace('px', '') - 0
    this.height = window.getComputedStyle(this.$refs.svg).height.replace('px', '') - 0
    await this.initData()
    this.showText()
  },

  methods: {
    async getData () {
      try {
        const { nodes, relations } = await graphApi.QueryGraphInfoByKeyword(this.searchKey)

        this.nodes = nodes
        this.links = relations
      } catch (error) {
        this.$message.error(error.toString())
      }
    },

    async initData () {
      await this.getData()

      this.svg = d3.select('svg')
        .append('g')

      // 力导向图
      this.forceSimulation = d3.forceSimulation()
        .alpha(0.01) // 活力  渲染之后再自动动多久
        .force('link', d3.forceLink().id(data => data.id)) // 映射id & 线的长度
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        .force('collide', d3.forceCollide(d => {
          // 两个球是固定中心词会有重叠问题
          if (d.id === this.searchKey && this.nodes.length > 4) {
            d.fx = this.width / 2 // 设置特定节点固定x坐标
            d.fy = this.height / 2
          }
          return 50 * d.value + 7
        })) // 碰撞力  使球之间不重合

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
        .attr('class', 'edge')
        .attr('stroke', '#f1f1f1')
        .attr('stroke-width', '2px')
        // .attr('stroke-opacity', 0.8)
        .attr('target', data => data.target.name)
        .attr('source', data => data.source.name)
        .style('display', 'none')

      const gs = this.svg.selectAll('.node')
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (data, index) => {
          return `translate(${data.x}, ${data.y})`
        })
        // .call(d3.drag()
        //   .on('start', this.started)
        //   .on('drag', this.dragged)
        //   .on('end', this.ended)
        // )
      gs.append('circle')
        .attr('r', data => data.id === this.searchKey ? 60 * data.value : 50 * data.value)
        .attr('fill', data => data.id === this.searchKey ? '#9efff9' : this.calcColor(data.type))
        // .attr('fill-opacity', 0.8)
        .attr('id', data => data.id)
        .attr('style', 'cursor: pointer;')
        .on('click', (data) => {
          this.showDetail(data.id)
        })

      gs.append('text')
        .attr('id', data => {
          return data.id
        })
        .style('text-anchor', 'middle')
        .selectAll('tspan')
        // .data(d => d.name.split(/(?=[A-Z][^A-Z])/g))
        .data(d => {
          return d.name ? d.name.split(' ') : ''
        })
        .join('tspan')
        .attr('x', 0)
        .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
        .text(data => data)
        .style('cursor', 'pointer')
        .style('display', 'block')
        .style('opacity', 0.6)
        .on('click', (data, index, nodes) => {
          const id = nodes[0].parentNode['id']
          this.showDetail(id)
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

    showText () {
      const textNodeList = d3.selectAll('.node').select('text')
      textNodeList.style('opacity', 0.2)
      const circleList = d3.selectAll('.node').select('circle')
      circleList.style('opacity', 0.2)
      const edgeList = d3.selectAll('.edge')
      edgeList.style('display', 'none')
      let selectArr = []
      this.links.forEach(item => {
        if (item.source.id === this.currentWord || item.target.id === this.currentWord) {
          selectArr.push(item.source.id)
          selectArr.push(item.target.id)
        }
      })
      const filter = textNodeList.filter(data => {
        return selectArr.includes(data.id)
      })
      filter.style('opacity', 1)

      const cirlceFilter = circleList.filter(data => {
        return selectArr.includes(data.id)
      })
      cirlceFilter.style('opacity', 1)

      const edgeFilter = edgeList.filter(data => data.target.id === this.currentWord || data.source.id === this.currentWord)
      edgeFilter.style('display', '')
    },

    showDetail (id) {
      // let x = this.width / 2
      // let y = this.height / 2
      // let name = this.currentWord
      // if (v) {
      //   x = v.x
      //   y = v.y
      //   name = v.name
      // }
      // let k = 1.5
      // if (this.currentWord === name && this.scale) {
      //   x = this.width / 2
      //   y = this.height / 2
      //   k = 1
      // }
      this.currentWord = id
      this.showText()
      // this.svg
      //   .transition()
      //   .duration(750)
      //   .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
      // this.scale = k > 1
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
    },

    getRelatedWord () {
      const temp = this.links.filter(item => item.source.id === this.currentWord && item.target.id.indexOf('keyword') > -1)
      if (temp) {
        return temp.map(item => item.target.name)
      } else {
        return []
      }
    },

    getRelatedExpert () {
      const temp = this.links.filter(item => item.source.id === this.currentWord && item.target.id.indexOf('scholar') > -1)
      if (temp) {
        return temp.map(item => item.target.name)
      } else {
        return []
      }
    },

    goSearch (key) {
      this.$router.push(`/search/result/${key}`)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

  .graph-wrapper {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
    header {
      flex: 0 0 60px;
      width: 100%;
      line-height: 60px;
      background: @bgColor;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      background: url('./img/bg.png') center center repeat-x;
      .header-container {
        width: 90%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        font-size: 36px;
        font-weight: 700;
        align-items: center;
        height: 65px;
        img {
          margin-right: 20px;
        }
         /deep/ .el-input-group--append .el-input__inner, .el-input-group__prepend {
          border-width: 0px;
        }

        /deep/ .el-input-group__append {
          // border-width: 0px;
          color: #fff;
          background-color: #343c4e;
        }

        /deep/ .el-input-group {
          // box-shadow: 0px 24px 31.85px 3.15px rgba(45, 45, 45, 0.4);
          border-bottom-right-radius: 5px;
        }
      }
    }

    .breadcrumb {
      width: 90%;
      margin: 0 auto;
      padding: 16px 0;
      border: solid 1px @borderColor;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
    }

    .graph-container {
      flex: 1 1 100%;
      width: 90%;
      margin: 0 auto;
      display: flex;
      flex-flow: row nowrap;

      .svg {
        flex: 1 1 auto;
      }

      .pannel {
        flex: 0 0 320px;
        padding-top: 30px;

        .box-card {
          margin-bottom: 20px;
          .title {
            font-size: 20px;
            font-weight: 700;
          }
          .tag {
            margin: 0 10px 10px 0;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
