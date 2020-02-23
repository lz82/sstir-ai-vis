<template>
  <div class="card-standard-wrapper">
    <div class="author-container">
      <h3 class="author-title"><i class="iconfont iconbiaozhun" style="color:#F56C6C;margin-right: 5px; font-size: 24px;"/>{{  keyword }} of the standards</h3>
      <span class="more" @click="onClickMore">More</span>
    </div>
    <ul>
      <li v-for="item in list" :key="item.id" @click="onRedirectClick(item.id)">
        <h4 class="title"><span v-html="item.nameCN"></span></h4>
        <div class="content">
          <div class="tag">
            <span>
              Standard Number：{{item.standardNo}}
            </span>
             <span>
              Release Date：{{item.publishDate}}
            </span>
             <span>
              State：{{item.status}}
            </span>
          </div>
          <div class="summary">
            Abstract：<span v-html="item.summary"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CardStandard',

  props: {
    list: {
      type: Array
    },
    keyword: {
      type: String
    },
    searchtype: {
      type: String,
      default: 'subject'
    }
  },

  methods: {
    onClickMore () {
      this.$emit('click-more')
    },

    onRedirectClick (id) {
      this.$router.push({
        path: `/detail/standard/${id}`,
        query: {
          keyword: this.keyword,
          searchtype: this.searchtype
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

  .card-standard-wrapper {
    background: #fff;
    display: flex;
    flex-flow: column nowrap;

    .author-container {
      height: 20px;
      display:flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      // border-left-style: solid;
      // border-left-width: 6px;
      // border-left-color: #000;
      // border-left: sloid 6px #000;
      // padding-left: 10px;
      margin-bottom: 20px;
      .author-title {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        color: #F56C6C;
      }
      .more {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }
    }
    ul {
      border: solid 1px @borderColor;
      border-left-width: 0;
      border-right-width: 0;

      li {
        padding: 17px 0 24px 0;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: @borderColor;
        cursor: pointer;
        &:last-child {
          border-bottom-width: 0;
        }
        .title {
          font-size: 16px;
          color: #2983f3;
          /deep/ mark {
            background-color: #fff !important;
            color: #f99f3e !important;
            font-weight: 500;
          }
        }

        .content {
          padding-top: 25px;
          font-size: 14px;
          color: #000;
          .tag {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
          }

          .summary {
            padding-top: 15px;
            line-height: 24px;

            /deep/ mark {
              background-color: #fff !important;
              color: #f99f3e !important;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
</style>
