<template>
  <div class="tag-cloud-wrapper">
    <canvas id="tagcanvas" :width="containerWidth" :height="containerHeight">
        <ul id="taglist">
          <li v-for="item in tags" :key="item.url" @click="onTagClick(item.url)">
            <router-link
              :to="item.url"
            >
              <img :src="item.img" width="85px" height='85px'>
            </router-link>
          </li>
        </ul>
      </canvas>
  </div>
</template>

<script>
export default {
  name: 'TagCloud',

  props: {
    containerWidth: {
      type: Number,
      default: 750
    },
    containerHeight: {
      type: Number,
      default: 567
    },
    tags: {
      type: Array
    }
  },

  data () {
    return {
      ttags: 'taglist',
      lock: 'y',
      shape: 'vcylinder'
    }
  },

  mounted () {
    this.initTag()
  },

  methods: {
    initTag () {
      window.TagCanvas.initial = [0.1, -0.01]
      window.TagCanvas.outlineColour = 'rgba(255, 255, 255,0.1)'
      window.TagCanvas.maxSpeed = 0.05
      window.TagCanvas.minSpeed = 0.02
      window.TagCanvas.wheelZoom = false
      window.TagCanvas.outlineRadius = 40
      window.TagCanvas.imageMode = 'image'
      window.TagCanvas.imageRadius = '50%'
      window.TagCanvas.imageScale = 1
      window.TagCanvas.radiusX = 1.4
      window.TagCanvas.activeCursor = 'pointer'
      // window.TagCanvas.radiusZ = 0.5
      window.TagCanvas.outlineMethod = 'size'
      window.TagCanvas.outlineIncrease = 16
      window.TagCanvas.dragControl = true
      window.TagCanvas.shape = 'vring(0.1)'
      window.TagCanvas.lock = 'y'
      window.TagCanvas.offsetY = -60
      window.TagCanvas.zoomMax = 1
      window.TagCanvas.Start('tagcanvas', 'taglist')
    },

    restart () {
      window.TagCanvas.shape = this.shape
      window.TagCanvas.lock = this.lock
      window.TagCanvas.Start('tagcanvas', this.ttags)
    },

    changetags (t) {
      this.ttags = t
      this.restart()
    },

    changeshape (s) {
      let locks = { hcylinder: 'x', vcylinder: 'y', hring: 'x', vring: 'y', sphere: '' }
      this.lock = locks[s] || ''
      this.shape = s
      window.TagCanvas.initial = (this.lock === 'x' && [0, 0.2]) || (this.lock === 'y' && [0.2, 0]) || [0.2, 0.2]
      this.restart()
    },

    mouseOver () {
      window.TagCanvas.Pause('tagcanvas')
      // window.TagCanvas.maxSpeed = 0
      // window.TagCanvas.Start('tagcanvas', this.ttags)
    },

    mouseLeave () {
      window.TagCanvas.Resume('tagcanvas')
      // window.TagCanvas.maxSpeed = 0.05
      // window.TagCanvas.Start('tagcanvas', this.ttags)
    },

    onTagClick (url) {
      console.log(url)
    }
  }
}
</script>

<style lang="less" scoped>
  .tag-cloud-wrapper {
    #tagcanvas{
      background: url(./img/bg_tag_cloud.png) no-repeat center 0;
      background-size: 100% 100%;
    }
  }
</style>
