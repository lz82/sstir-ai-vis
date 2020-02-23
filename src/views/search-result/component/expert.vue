<template>
  <div class="wiki-wrapper">
    <div class="info">
      <div class="avatar">
        <img :src="info.headImg" alt="">
      </div>
      <div class="intro">
        <h4 class="name">{{info.name}}</h4>
        <p class="subject-e">{{info.institution}}</p>
        <!-- <p class="subject">{{info.subjectArea}}</p> -->
        <p class="subject">Computer Science</p>
        <p class="nation">{{info.country}}</p>
      </div>
    </div>
    <div class="cnt">
      <div class="cnt-info">
        <p class="num">{{info.totalIssues || 0}}</p>
        <p class="type">Number of Articles Published</p>
      </div>
      <div class="cnt-info">
        <p class="num">{{info.totalCitations || 0}}</p>
        <p class="type">Total Citation Frequency</p>
      </div>
      <div class="cnt-info">
        <p class="num">{{info.top1Citations | percentFormat}}</p>
        <p class="type">Top 1% High Cited Articles </p>
      </div>
      <div class="cnt-info">
        <p class="num">{{info.hIndex || 0}}</p>
        <p class="type">H-index</p>
      </div>
    </div>
    <div class="more" @click="goDetail">
      <span class="tixing"></span>
      <span class="word">More</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Expert',

  filters: {
    percentFormat (val) {
      return (val * 100).toFixed(2) + '%'
    }
  },

  props: {
    info: {
      type: Object
    },
    keyword: {
      type: String
    }
  },

  data () {
    return {}
  },

  methods: {
    goDetail () {
      this.$router.push({
        path: `/detail/expert/${this.info.id}`,
        query: {
          keyword: this.keyword
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';
  .wiki-wrapper {
    background: #fff;
    border: solid 1px @borderColor;
    border-radius: 5px;
    width: 100%;
    height: 150px;
    position: relative;
    display: flex;
    flex-flow: row nowrap;

    .info {
      position: relative;
      flex: 1 0 355px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding-left: 15px;
      .avatar {
        width: 91px;
        height: 102px;
        img {
          width: 91px;
          height: 102px;
          object-fit: cover;
        }
      }
      .intro {
        padding-left: 15px;
        display: flex;
        flex-flow: column nowrap;
        .name {
          font-size: 20px;
          font-weight: 700;
          padding-bottom: 20px;
          color: #000;
        }
        .subject-e {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
          padding-bottom: 10px;
        }

        .subject {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
          padding-bottom: 10px;
        }

        .nation {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }

      &:after {
        position: absolute;
        right: 0;
        top: 35px;
        content: '';
        width: 1px;
        height: 80px;
        background: @borderColor;
      }
    }

    .cnt {
      flex: 0 0 365px;
      display: flex;
      padding: 20px 0;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      .cnt-info {
        flex: 0 0 50%;
        text-align: center;
        .num {
          font-size: 18px;
          color: #000;
          padding-bottom: 8px;
        }
        .type {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }

    .more {
      cursor: pointer;
      .tixing {
        display: inline-block;
        width: 60px;
        height: 0px;
        border-bottom: 20px solid #f3f3f3;
        border-left: 8px solid transparent;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .word {
        position: absolute;
        right: 8px;
        bottom: 3px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 9px;
        font-weight: 500;
      }
    }
  }
</style>
