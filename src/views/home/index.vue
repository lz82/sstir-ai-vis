<template>
  <div class="home-wrapper">
    <div class="container" :style="{ width: width, height: height }">
      <div class="right">
        <h1 class="title">
          重点国别人工智能领域人才地图
        </h1>
        <div class="btn-wrapper">
          <div class="btn" @click="onEnter">
            进入
          </div>
        </div>
        <p class="org">
          科技部国外人才研究中心
        </p>
        <div class="footer">
          <img :src="sstir" alt="" @click="onLogoClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sstir from './img/sstir.png'

export default {
  name: 'Home',

  data() {
    return {
      sstir,
      height: '100vh',
      width: '100%'
    }
  },

  created() {
    const height = document.documentElement.clientHeight
    this.height = height + 'px'
    this.width = height * (1920 / 1080) + 'px'
  },

  mounted() {
    window.onresize = () => {
      return (() => {
        const height = document.documentElement.clientHeight
        console.log(height)
        this.height = height + 'px'
        this.width = height * (1920 / 1080) + 'px'
        this.$forceUpdate()
      })()
    }
  },

  methods: {
    onEnter() {
      this.$router.push('/report/list')
    },

    onLogoClick() {
      window.open('http://www.sstir.cn', '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.home-wrapper {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: #00213a;
  display: flex;
  flex-flow: row;
  justify-content: center;
  .container {
    min-width: 1200px;
    max-width: 1920px;
    background: url(./img/bg.png) no-repeat;
    background-size: 100% 100%;
    // padding-bottom: 56.25%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    position: relative;
    .right {
      flex: 0 0 35%;
      height: 100vh;
      box-sizing: border-box;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      position: relative;
      font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB',
        'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
      .title {
        padding-top: 50%;
        font-size: 26px;
        color: #fff;
        font-weight: 700;
        letter-spacing: 2px;
        text-shadow: 4px 1px 1px #000;
      }
      .org {
        padding-top: 60px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 400;
        text-shadow: 2px 1px 1px #000;
      }
      .btn-wrapper {
        padding-top: 80px;

        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 125px;
          height: 45px;
          border-radius: 22.5px;
          background: #163d62;
          color: #fff;
          cursor: pointer;

          &:hover {
            background: #00213a;
          }
        }
      }

      .footer {
        position: absolute;
        bottom: 35px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
      }
    }
    .logo {
      position: absolute;
      top: 20px;
      left: 20px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 18px;
    }
  }
}
</style>
