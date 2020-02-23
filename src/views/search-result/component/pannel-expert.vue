<template>
  <div class="pannel-expert-wrapper">
    <h3>{{getWord()}}</h3>
    <ul>
      <li v-for="item in expertList" :key="item.id" class="expert-container" @click="goDetail(item.id)">
        <!-- <img :src="item.headImg" alt=""> -->
        <img :src="item.headImg" alt="">
        <div class="info">
          <h5>{{ item.name }}</h5>
          <span>{{ item.institution }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExpertPannel',

  props: {
    keyword: {
      type: String
    },
    expertList: {
      type: Array
    },
    type: {
      type: String
    }
  },

  data () {
    return {}
  },

  methods: {
    goDetail (id) {
      this.$router.push({
        path: `/detail/expert/${id}`,
        query: {
          keyword: this.keyword
        }
      })
    },

    getWord () {
      return this.type === 'expert' ? 'Experts in the same Field' : 'Expert in this field'
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

  .pannel-expert-wrapper {
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: @borderColor;

    h3 {
      font-size: 14px;
      font-weight: 500;
      padding-bottom: 20px;
    }

    .expert-container {
      cursor: pointer;
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: 20px;
      img {
        width: 60px;
        height: 66px;
        object-fit: cover;
      }

      .info {
        padding: 10px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        h5 {
          font-size: 14px;
        }
        span {
          margin-top: 10px;
          color: rgba(0, 0, 0, 0.5);
          font-size: 12px;
        }
      }
    }
  }
</style>
