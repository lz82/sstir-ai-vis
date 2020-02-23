<template>
  <div class="result-all-wrapper">
    <div class="left-wrapper">
      <div v-if="showNoData" class="no-result">
        <svg width="184" height="152" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
        <p>The data went to outer space.......</p>
      </div>
      <!-- wiki -->
      <wiki
        v-if="result.wikiInfo"
        :title="result.wikiInfo.data.subjectWord"
        :title-e="result.wikiInfo.data.subjectWordEn"
        :desc="result.wikiInfo.data.wiki"
      />

      <!-- 专家 -->
      <expert
        v-if="result.expertInfo"
        :keyword="result.keyword"
        :info="result.expertInfo.data"
      />

      <!-- 知识图谱 -->
      <template v-if="result.graphInfo && result.graphInfo.nodes && result.graphInfo.nodes.length > 0">
        <div class="space" ></div>
        <knowledge-graph
          :keyword="result.keyword"
          :nodes="result.graphInfo.nodes"
          :links="result.graphInfo.relations"
          :nodeId="result.nodeId"
        />
      </template>

      <!-- 论文 -->
      <template v-if="result.paperList && result.paperList.length > 0">
        <div class="space"></div>
        <card-paper
          :list="result.paperList.slice(0, 5)"
          :keyword="result.keyword"
          :searchtype="type"
          @click-more="onMoreClick('paper')"
        />
      </template>

      <!-- 专利 -->
      <template v-if="result.patentList && result.patentList.length > 0">
        <div class="space"></div>
        <card-patent
          :list="result.patentList.slice(0, 5)"
          :keyword="result.keyword"
          :searchtype="type"
          @click-more="onMoreClick('patent')"
        />
      </template>

      <!-- 图书 -->
      <template v-if="result.bookList && result.bookList.length > 0">
        <div class="space"></div>
        <card-book
          :list="result.bookList.slice(0, 5)"
          :keyword="result.keyword"
          :searchtype="type"
          @click-more="onMoreClick('book')"
        />
      </template>

      <!-- 标准 -->
      <template v-if="result.standardList && result.standardList.length > 0">
        <div class="space"></div>
        <card-standard
          :list="result.standardList.slice(0, 5)"
          :keyword="result.keyword"
          :searchtype="type"
          @click-more="onMoreClick('standard')"
        />
      </template>

    </div>
    <div class="right-wrapper">
      <!-- 相关专家 -->
      <div
        v-if="showRelatedExpert"
        class="expert-container"
      >
        <pannel-expert
          :keyword="result.keyword"
          :expertList="result.graphInfo.expertReco"
          :type="type"
        />
      </div>
      <!-- 相关技术 -->
      <div
        v-if="showRelatedTech"
        class="tech-container"
      >
        <pannel-tech
          :list="result.graphInfo.subjectReco"
        />
      </div>
      <!-- 合作机构 -->
      <div
        v-if="showRelatedOrg"
        class="org-container"
      >
        <pannel-org
          :list="result.graphInfo.institutionsReco"
        />
      </div>
      <!-- 相关期刊会议 -->
      <div
        v-if="showRelatedMeeting"
        class="meeting-container"
      >
        <pannel-meeting
          :list="result.graphInfo.journalsReco"
        />
      </div>
       <!-- 热词推荐 -->
       <div
        v-if="showHot"
        class="hot-container"
       >
         <pannel-hot />
       </div>
    </div>
  </div>
</template>

<script>
import Wiki from './wiki'
import Expert from './expert'
import KnowledgeGraph from './knowledge-graph'
import CardPaper from './card-paper'
import CardPatent from './card-patent'
import CardBook from './card-book'
import CardStandard from './card-standard'
import PannelExpert from './pannel-expert'
import PannelTech from './pannel-tech'
import PannelOrg from './pannel-org'
import PannelMeeting from './pannel-meeting'
import PannelHot from './pannel-hot'

export default {
  name: 'ResultAll',

  components: {
    Wiki,
    Expert,
    KnowledgeGraph,
    CardPaper,
    CardPatent,
    CardBook,
    CardStandard,
    PannelExpert,
    PannelTech,
    PannelOrg,
    PannelMeeting,
    PannelHot
  },

  props: {
    result: {
      type: Object
    },
    type: {
      type: String
    }
  },

  data () {
    return {}
  },

  computed: {
    showRelatedExpert () {
      return this.type !== 'other' &&
        this.result.graphInfo &&
        this.result.graphInfo.expertReco &&
        this.result.graphInfo.expertReco.length > 0
    },

    showRelatedTech () {
      return this.type !== 'other' &&
        this.result.graphInfo &&
        this.result.graphInfo.subjectReco &&
        this.result.graphInfo.subjectReco.length > 0
    },

    showRelatedOrg () {
      return this.type === 'expert' &&
        this.result.graphInfo &&
        this.result.graphInfo.institutionsReco &&
        this.result.graphInfo.institutionsReco.length > 0
    },

    showRelatedMeeting () {
      return this.type === 'subject' &&
        this.result.graphInfo &&
        this.result.graphInfo.journalsReco &&
        this.result.graphInfo.journalsReco.length > 0
    },

    showHot () {
      return !this.showRelatedExpert &&
        !this.showRelatedTech &&
        !this.showRelatedOrg &&
        !this.showRelatedMeeting
    },

    showNoData () {
      // return !this.result
      return !this.result.wikiInfo &&
        !this.result.expertInfo &&
         (!this.result.graphInfo || (this.result.graphInfo && !this.result.graphInfo.nodes)) &&
         (!this.result.paperList || this.result.paperList.length === 0) &&
      (!this.result.patentList || this.result.patentList.length === 0) &&
      (!this.result.booklist || this.result.booklist.length === 0) &&
      (!this.result.standardList || this.result.standardList.length === 0)
    }
  },

  methods: {
    onMoreClick (val) {
      this.$emit(`click-more`, val)
    }
  }
}
</script>

<style lang="less" scoped>
  .result-all-wrapper {
    display: flex;
    flex-flow: row nowrap;
    background: #fff;
    .left-wrapper {
      flex: 0 0 790px;
      display: flex;
      flex-flow: column nowrap;
      padding-right: 20px;
      .no-result{
        text-align: center;
        color: rgba(0,0,0,0.6);
      }
      .space {
        height: 40px;
      }
    }

    .right-wrapper {
      flex: 0 0 280px;
      padding-left: 30px;
    }
  }
</style>
