<template>
  <div class="search-result-wrapper">

    <div class="breadcrumb-wrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><span>Search Result</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="All" name="all">
        <result-all
          :result="searchResult"
          :type="searchType"
          @click-more="swichTab"
        />
      </el-tab-pane>
      <el-tab-pane v-if="showTabPaper" label="Article" name="paper" class="item-list">
        <paper-list
          :list="searchResult.paperList"
          :keyword="searchKey"
          :type="searchType"
        />
      </el-tab-pane>
      <el-tab-pane v-if="showTabPatent" label="Patent" name="patent" class="item-list">
        <patent-list
          :list="searchResult.patentList"
          :keyword="searchKey"
          :type="searchType"
        />
      </el-tab-pane>
      <el-tab-pane v-if="showTabBook" label="Book" name="book" class="item-list">
        <book-list
          :list="searchResult.bookList"
          :keyword="searchKey"
          :type="searchType"
        />
      </el-tab-pane>
      <el-tab-pane v-if="showTabStandard" label="Standard" name="standard" class="item-list">
        <standard-list
          :list="searchResult.standardList"
          :keyword="searchKey"
          :type="searchType"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ResultAll from './component/resultlist-all'
import PaperList from './component/list-paper'
import PatentList from './component/list-patent'
import BookList from './component/list-book'
import StandardList from './component/list-standard'

import { searchApi } from '@/service'
// import axios from 'axios'
export default {
  name: 'SearchResult',

  components: {
    ResultAll,
    PaperList,
    PatentList,
    BookList,
    StandardList
  },

  props: {
    searchKey: {
      type: [String, Number]
    }
  },

  data () {
    return {
      activeName: 'all',
      searchType: '',
      showTabPaper: false,
      showTabPatent: false,
      showTabBook: false,
      showTabStandard: false,
      searchResult: {
        nodeId: '',
        keyword: this.searchKey,
        wikiInfo: null,
        expertInfo: null,
        graphInfo: null,
        paperList: [],
        patentList: [],
        bookList: [],
        standardList: []
      }
    }
  },

  watch: {
    async searchKey (newVal) {
      await this.queryData()
    }
  },

  async mounted () {
    // 异步请求搜索数据,获取搜索结果
    // 如果没有关键词，则返回首页
    if (!this.searchKey) {
      this.$router.push('/')
    }
    await this.queryData()
  },

  methods: {
    swichTab (val) {
      this.activeName = val
      window.scrollTo(0, 0)
    },

    async queryData () {
      this.activeName = 'all'
      this.searchResult.keyword = this.searchKey
      try {
        const intro = await searchApi.QueryIntroByKeyword(this.searchKey)
        this.searchResult = {
          nodeId: '',
          keyword: this.searchKey,
          wikiInfo: null,
          expertInfo: null,
          graphInfo: null,
          paperList: [],
          patentList: [],
          bookList: [],
          standardList: []
        }
        // expert
        if (intro && intro.type === 'expert') {
          this.searchResult.wikiInfo = null
          this.searchResult.expertInfo = intro
          this.searchResult.nodeId = intro.data.id + '_scholar'
        }

        // wiki
        if (intro && intro.type === 'subject') {
          this.searchResult.expertInfo = null
          this.searchResult.wikiInfo = intro
          this.searchResult.nodeId = intro.data.id + '_keyword'
        }

        // other
        if (intro && intro.type === 'other') {
          this.searchResult.wikiInfo = null
          this.searchResult.expertInfo = null
        }

        this.searchType = intro ? intro.type : 'other'
        const queryParam = {
          keyword: this.searchKey,
          type: this.searchType
        }
        if (intro) {
          const [graph, paper, book, patent, standard] = await Promise.all([searchApi.QueryGraphByKeyword(this.searchKey, this.searchType),
            searchApi.QueryPaperByKeyword(queryParam), searchApi.QueryBookByKeyword(queryParam), searchApi.QueryPatentByKeyword(queryParam), searchApi.QueryStandardByKeyword(queryParam)])
          // graph
          this.searchResult.graphInfo = graph

          // paper
          this.searchResult.paperList = paper
          this.showTabPaper = paper.length > 0

          // patent
          this.searchResult.patentList = patent
          this.showTabPatent = patent && patent.length > 0

          // book
          this.searchResult.bookList = book
          this.showTabBook = book.length > 0

          // standard
          this.searchResult.standardList = standard
          this.showTabStandard = standard.length > 0
        }
      } catch (err) {
        this.$alert(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-result-wrapper {
    /deep/ .el-tabs__item.is-active {
      color: #000;
    }
    /deep/ .el-tabs__active-bar {
      background-color: #000;
    }
    /deep/ .el-tabs__item {
      color: #a3a3a3;
      &:hover {
        color: #000;
      }
    }
    .breadcrumb-wrapper {
      margin: 20px 0;
    }
  }
</style>
