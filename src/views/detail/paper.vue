<template>
  <div class="paper-detail-wrapper">

    <div class="bread">
      <breadcrumb
        type="Article"
      />
    </div>

    <div class="detail-container">
      <h3 class="title">{{title}}</h3>

      <div class="line">
        <span class="left">Author:</span>
        <p class="right">{{author}}</p>
      </div>

      <div class="line">
        <span class="left">Abstract:</span>
        <p class="right">{{summary}}</p>
      </div>

      <div class="line">
        <span class="left">Key word:</span>
        <p class="right">{{keywords}}</p>
      </div>

       <!-- <div class="line">
        <span class="left">Publish Time:</span>
        <p class="right">{{publishDate}}</p>
      </div> -->

      <!-- <div class="line">
        <span class="left">学&nbsp;&nbsp;科:</span>
        <p class="right">{{subject}}</p>
      </div>

      <div class="line">
        <span class="left">来源数据库:</span>
        <p class="right">{{sourceDB}}</p>
      </div>

      <div class="line">
        <span class="left">被引频次:</span>
        <p class="right">{{citedIndex}}</p>
      </div>

      <div class="line">
        <span class="left">会议/期刊名:</span>
        <p class="right">{{journals}}</p>
      </div>

       <div class="line">
        <span class="left">分类号:</span>
        <p class="right">{{categoryNo}}</p>
      </div>

      <div class="line">
        <span class="left">基金项目:</span>
        <p class="right">{{fundProject}}</p>
      </div> -->

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
                  Author：<span v-html="item.author"></span>
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
  name: 'PaperDetail',

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
      // searchType: this.$route.query.searchtype,
      searchType: 'subject',
      title: '',
      author: '',
      summary: '',
      keywords: '',
      publishDate: '',
      subject: '',
      sourceDB: '',
      citedIndex: '',
      journals: '',
      categoryNo: '',
      fundProject: '',
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
      try {
        const info = await detailApi.GetPaperInfoById(this.id)
        this.title = info.title
        this.author = info.author
        this.summary = info.summaryAll
        this.keywords = info.keywords
        this.publishDate = info.publishDate
        this.subject = info.subject
        this.sourceDB = info.sourceDB
        this.citedIndex = info.citedIndex
        this.journals = info.journals
        this.categoryNo = info.categoryNo
        this.fundProject = info.fundProject
        const queryPaperParam = {
          keyword: this.keywords,
          type: this.searchType,
          id: this.id
        }
        const list = await searchApi.QueryPaperByKeyword(queryPaperParam)
        this.list = list.slice(0, 19)
      } catch (err) {
        this.$alert('The data went to outer space.......')
      }
    },

    onRedirectClick (id) {
      this.$router.push({
        path: `/detail/paper/${id}`,
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

  .paper-detail-wrapper {
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
          flex: 0 0 100px;
          padding-right:20px;
          text-align: right;
          font-weight: 500;
        }

        .right {
          box-sizing: border-box;
          flex: 1 1 700px;
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
