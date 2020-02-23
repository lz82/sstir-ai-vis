<template>
  <div class="standard-detail-wrapper">
    <div class="bread">
      <breadcrumb type="Standard" />
    </div>

    <div class="detail-container">
      <h3 class="title">{{nameCN}}({{nameEN}})</h3>

      <div class="line">
        <span class="left">Standard Number:</span>
        <p class="right">{{standardNo}}</p>
      </div>

      <div class="line">
        <span class="left">China Standard Classification Number:</span>
        <p class="right">{{categoryNoCN}}</p>
      </div>

      <div class="line">
        <span class="left">International Standard Classification Number:</span>
        <p class="right">{{categoryNoIN}}</p>
      </div>

      <div class="line">
        <span class="left">Abstract:</span>
        <p class="right">{{summary}}</p>
      </div>

      <!-- <div class="line">
        <span class="left">起草单位:</span>
        <p class="right">{{org}}</p>
      </div>-->

      <div class="line">
        <span class="left">Mandatory Criteria:</span>
        <p class="right">{{force}}</p>
      </div>

      <div class="line">
        <span class="left">State:</span>
        <p class="right">{{status}}</p>
      </div>

      <div class="line">
        <span class="left">Release Date:</span>
        <p class="right">{{publishDate}}</p>
      </div>

      <div class="line">
        <span class="left">Implementation Date:</span>
        <p class="right">{{useDate}}</p>
      </div>
    </div>

    <div class="relation-container">
      <div class="author-container">
        <h3 class="author-title">Related Articles</h3>
      </div>
      <ul>
        <li v-for="item in list" :key="item.id" @click="onRedirectClick(item.id)">
          <h4 class="title" v-html="item.nameCN"></h4>
          <div class="content">
            <div class="tag">
              <span class="author">Standard Number：{{item.standardNo}}</span>
              <span>Release Date：{{item.publishDate}}</span>
              <span>State：{{item.status}}</span>
            </div>
            <div class="summary">
              Abstract：
              <span v-html="item.summaryAll"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb'
import { detailApi, searchApi } from '@/service'

export default {
  name: 'StandardDetail',

  components: {
    Breadcrumb
  },

  props: {
    id: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String
      // required: true
    }
  },

  data () {
    return {
      searchKey: this.$route.query.keyword,
      searchType: this.$route.query.searchtype,
      nameCN: '',
      nameEN: '',
      standardNo: '',
      categoryNoCN: '',
      categoryNoIN: '',
      summary: '',
      org: '',
      force: '',
      status: '',
      publishDate: '',
      useDate: '',
      list: []
    }
  },

  watch: {
    id () {
      this.initData()
    }
  },

  mounted () {
    this.initData()
  },

  methods: {
    async initData () {
      const queryPaperParam = {
        keyword: this.searchKey,
        type: this.searchType,
        id: this.id
      }
      const [info, list] = await Promise.all([
        detailApi.GetStandardInfoById(this.id),
        searchApi.QueryStandardByKeyword(queryPaperParam)
      ])
      this.nameCN = info.nameCN
      this.nameEN = info.nameEN
      this.standardNo = info.standardNo
      this.categoryNoCN = info.categoryNoCN
      this.categoryNoIN = info.categoryNoIN
      this.summary = info.summaryAll
      this.org = info.draftUnit // 暂无  起草单位
      this.force = info.mandatoryStandard // 暂无 强制性标准
      this.status = info.status // 状态
      this.publishDate = info.publishDate // 发布时间
      this.useDate = info.implementDate // 暂无 实施时间

      this.list = list.slice(0, 19)
    },

    onRedirectClick (id) {
      this.$router.push({
        path: `/detail/standard/${id}`,
        query: {
          keyword: this.searchKey
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/style/variables.less";

.standard-detail-wrapper {
  width: 950px;

  .bread {
    margin: 20px 0 30px 0;
  }

  .detail-container {
    display: flex;
    flex-flow: column nowrap;

    .title {
      font-size: 20px;
      padding-bottom: 25px;
    }

    .line {
      display: flex;
      flex-flow: row wrap;
      padding-bottom: 10px;
      font-size: 14px;
      line-height: 24px;
      .left {
        flex: 0 0 310px;
        padding-right:20px;
        text-align: right;
        font-weight: 500;
      }

      .right {
        box-sizing: border-box;
        flex: 1 1 620px;
        padding-left: 10px;
      }
    }
  }

  .relation-container {
    padding: 70px 0 30px 0;
    .author-container {
      height: 20px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      border-left-style: solid;
      border-left-width: 6px;
      border-left-color: #000;
      border-left: sloid 6px #000;
      padding-left: 10px;
      margin-bottom: 20px;
      .author-title {
        font-size: 16px;
        font-weight: 500;
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
          }
        }
      }
    }
  }
}
</style>
