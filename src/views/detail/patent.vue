<template>
  <div class="patent-detail-wrapper">

    <div class="bread">
      <breadcrumb
        type="Patent"
      />
    </div>

    <div class="detail-container">
      <h3 class="title">{{title}}</h3>

      <div class="line">
        <span class="left">Abstract:</span>
        <p class="right">{{summary}}</p>
      </div>

      <div class="line">
        <span class="left">Patent ID:</span>
        <p class="right">{{patentNo}}</p>
      </div>

       <div class="line">
        <span class="left">Applicant:</span>
        <p class="right">{{applicant}}</p>
      </div>

      <!-- <div class="line">
        <span class="left">专利类型:</span>
        <p class="right">{{type}}</p>
      </div>

      <div class="line">
        <span class="left">PCT:</span>
        <p class="right">{{pct}}</p>
      </div> -->

      <div class="line">
        <span class="left">Country / Province code:</span>
        <p class="right">{{countryCode}}</p>
      </div>

      <!-- <div class="line">
        <span class="left">法律状态:</span>
        <p class="right">{{legalStatus}}</p>
      </div> -->

      <div class="line">
        <span class="left">Classification Number:</span>
        <p class="right">{{categoryNo}}</p>
      </div>

      <div class="line">
        <span class="left">Inventor:</span>
        <p class="right">{{inventor}}</p>
      </div>

    </div>

    <div class="relation-container">
      <div class="author-container">
        <h3 class="author-title">Related Articles</h3>
      </div>
      <ul>
        <li v-for="item in list" :key="item.id" @click="onRedirectClick(item.id)">
          <h4 class="title" v-html="item.title"></h4>
          <div class="content">
              <div class="tag">
                <span class="author">
                  Patentee：<span v-html="item.inventor"></span>
                </span>
              </div>
              <div class="summary">
                Abstract：<span v-html="item.summaryAll"></span>
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
  name: 'PatentDetail',

  components: {
    Breadcrumb
  },

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      searchKey: this.$route.query.keyword,
      searchType: this.$route.query.searchtype,
      title: '',
      author: '',
      summary: '',
      patentNo: '',
      applicant: '',
      type: '',
      pct: '',
      countryCode: '',
      legalStatus: '',
      categoryNo: '',
      inventor: '',
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
      const queryPatentParam = {
        keyword: this.searchKey,
        type: this.searchType,
        id: this.id
      }
      const [info, list] = await Promise.all([detailApi.GetPatentInfoById(this.id), searchApi.QueryPatentByKeyword(queryPatentParam)])

      this.title = info.title
      this.summary = info.summaryAll
      this.patentNo = info.patentNo
      this.applicant = info.applicant
      this.type = info.type
      this.pct = info.pct
      this.countryCode = info.countryCode
      this.legalStatus = info.legalStatus
      this.categoryNo = info.categoryNo
      this.inventor = info.inventor

      this.list = list.slice(0, 19)
    },

    onRedirectClick (id) {
      this.$router.push({
        path: `/detail/patent/${id}`,
        query: {
          keyword: this.searchKey
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

  .patent-detail-wrapper {
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
          flex: 0 0 180px;
          padding-right:20px;
          text-align: right;
          font-weight: 500;
        }

        .right {
          box-sizing: border-box;
          flex: 1 1 600px;
          padding-left: 10px;
        }
      }
    }

    .relation-container {
      padding: 70px 0 30px 0;
      .author-container {
        height: 20px;
        display:flex;
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
