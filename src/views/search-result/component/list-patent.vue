<template>
  <div class="list-patent-wrapper">
    <ul>
      <li v-for="item in list" :key="item.id" @click="onRedirectClick(item.id)">
        <h4 class="title" v-html="item.title"></h4>
        <div class="content">
          <div class="tag">
            <span class="author">
              Patentee：<span v-html="item.inventor" />
            </span>
            <!-- <span class="author">
              专利类型：{{item.type}}
            </span> -->
            <span class="author">
              Classification Number：{{item.categoryNo}}
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
  name: 'PatentList',

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
        path: `/detail/patent/${id}`,
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

  .list-patent-wrapper {
    display: flex;
    flex-flow: column nowrap;
    background: #fff;

    ul {
      width: 800px;
      border: solid 1px @borderColor;
      border-left-width: 0;
      border-right-width: 0;
      border-top-width: 0;

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
