<template>
  <div class="expert-detail-wrapper">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/report/list' }"
          ><i class="el-icon-pie-chart" />&nbsp;可视化报告</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/report/expert-rank' }"
          >全球人工智能TOP200科研专家</el-breadcrumb-item
        >
        <el-breadcrumb-item>专家详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="basic-container">
      <div class="info">
        <div class="avatar">
          <img :src="pic" alt="" />
        </div>
        <div class="intro">
          <h4 class="name">{{ name }}</h4>
          <p class="subject-e">{{ institution }}</p>
          <!-- <p class="subject">{{subjectArea}}</p> -->
          <p class="subject">{{ title }}</p>
          <p class="nation">{{ country }}</p>
        </div>
      </div>
      <div class="cnt">
        <div class="cnt-info">
          <p class="num">{{ ciation }}</p>
          <p class="type">引文量</p>
        </div>
        <div class="cnt-info">
          <p class="num">{{ paperCnt }}</p>
          <p class="type">发表论文量</p>
        </div>
        <div class="cnt-info">
          <p class="num">{{ (pIndex - 0).toFixed(2) }}</p>
          <p class="type">篇均被引</p>
        </div>
        <div class="cnt-info">
          <p class="num">{{ hIndex }}</p>
          <p class="type">H-index</p>
        </div>
      </div>
    </div>
    <div class="space-10"></div>
    <el-card style="margin-bottom: 20px;">
      <h3 class="chart-title"><i class="iconfont icon-jiaoyu" />&nbsp;教育背景</h3>
      <div class="chart-wrapper desc" v-html="edu ? edu : '暂无'"></div>
    </el-card>
    <div class="space-10"></div>
    <el-card style="margin-bottom: 20px;">
      <h3 class="chart-title"><i class="iconfont icon-renyuanjieshao" />&nbsp;个人简介</h3>
      <div class="chart-wrapper desc" v-html="desc ? desc : '暂无'"></div>
    </el-card>
    <div class="space-10"></div>
    <el-card v-if="field.length > 0" style="margin-bottom: 20px;">
      <h3 class="chart-title"><i class="el-icon-trophy" />&nbsp;研究领域</h3>
      <el-tag v-for="item in field" :Key="item.name" style="margin: 0 10px 10px 0;">
        {{item.name}}
      </el-tag>
    </el-card>
    <div v-if="field.length > 0" class="space-10"></div>
    <el-card style="margin-bottom: 20px;">
      <h3 class="chart-title"><i class="iconfont icon-lunwentimu" />&nbsp;主要论文</h3>
      <div class="chart-wrapper" style="width:100%;">
        <el-table :data="paperList" max-height="500">
          <el-table-column label="论文标题" prop="name" width="1150px" />
        </el-table>
      </div>
    </el-card>
    <div class="space-10"></div>
  </div>
</template>

<script>
import rankData from './data/rank-data'
import titleData from './data/title-data'

export default {
  name: 'ExpertDetail',

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      pic: '',
      name: '',
      title: '',
      institution: '', // 机构
      subjectArea: '', // 学科领域
      country: '', // 国籍
      ciation: 0, // 引文量
      gIndex: 0,
      paperCnt: 0, // 论文数
      totalCitations: 0, // 总被引数
      top1Citations: 0, // 前1%高被引
      hIndex: 0,
      desc: '',
      edu: '',
      paperList: [],
      pIndex: '',
      field: []
    }
  },

  mounted() {
    this.initData()
  },

  methods: {
    async initData() {
      const detail = rankData.find((item) => item.SID === this.id)
      console.log(detail)
      const titleObj = titleData.find((item) => item.SID === this.id)
      this.pic = detail.AVATAR
      this.name = detail.NAME
      // 机构
      this.institution = detail.AFF_EN
      this.title = detail.POS
      // 学科领域
      this.subjectArea = detail.subjectArea
      // 国籍
      this.country = detail.NATION
      // totalIssues
      this.ciation = detail.NUM_CIATION
      // totalCitations
      this.pIndex = detail.p_index
      // top1Citations
      this.paperCnt = detail.NUM_PUBS
      // H指数
      this.hIndex = detail.H_INDEX
      this.desc = detail.BIO // 个人简介
      this.edu = detail.EDU
      let fieldTemp = detail.FIELD.filter(item => item !== 'nan')
      this.field = fieldTemp.map(item => {
        return {
          name: item
        }
      })
      if (titleObj && titleObj.TITLE_LIST && titleObj.TITLE_LIST.length > 0) {
        this.paperList = titleObj.TITLE_LIST.map((item) => {
          return {
            name: item
          }
        })
      } else {
        this.paperList = detail.TITLE_LIST.map((item) => {
          return {
            name: item
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/variables.less';

.expert-detail-wrapper {
  .bread {
    color: #fff;
    padding: 20px 0;

    /deep/ .el-breadcrumb__inner {
      color: #fff !important;
    }
  }

  .basic-container {
    background: #fff;
    border: solid 1px @borderColor;
    border-radius: 5px;
    width: 100%;
    min-height: 150px;
    position: relative;
    display: flex;
    flex-flow: row nowrap;

    .info {
      position: relative;
      flex: 0 0 50%;
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
      flex: 0 0 450px;
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
  }

  .chart-title {
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    color: #66b1ff;
    // padding-left: 10px;

    // &:before {
    //   position: absolute;
    //   content: '';
    //   left: 0;
    //   top: 0;
    //   // top: 9px;
    //   width: 4px;
    //   height: 20px;
    //   background: #66b1ff;
    // }
  }

  .desc {
    line-height: 24px;
    color: rgba(0, 0, 0, 0.7);
  }

  .space-10 {
    height: 10px;
  }
}
</style>
