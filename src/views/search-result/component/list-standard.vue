<template>
  <div class="list-standard-wrapper">
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
  name: 'StandardList',

  props: {
    list: {
      type: Array
    },
    keyword: {
      type: String
    },
    type: {
      type: String
    }
  },

  data () {
    return {}
  },

  methods: {
    onRedirectClick (id) {
      this.$router.push({
        path: `/detail/standard/${id}`,
        query: {
          keyword: this.keyword,
          searchtype: this.type
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

  .list-standard-wrapper {
    display: flex;
    flex-flow: column nowrap;

    ul {
      width: 800px;
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
