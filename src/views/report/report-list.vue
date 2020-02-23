<template>
  <div class="report-list-wrapper">

    <div class="breadcrumb">
      <report-breadcrumb/>
    </div>

    <div class="container clearfix">
        <el-card v-for="item in list" :key="item.type" style="margin-bottom: 20px;" class='box-card'>
          <div class="report-wrapper" @click='onRedirectClick(item.type)'>
            <div class="report-item">
              <h2 class="title">
                <i class="iconfont" :class='item.iconame'></i>
                {{item.title}}
              </h2>
              <span class="more">More<i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="content">
              <div class="word">
                <p>{{item.content}}</p>
              </div>
            </div>
          </div>
        </el-card>
      </div>

  </div>
</template>

<script>
export default {
  name: 'ReportList',

  data () {
    return {
      list: [
        {
          title: '全球专家应用领域分布',
          content: '全球人工智能专家在各个应用领域的分布报告',
          type: 'expert-domain',
          iconame: 'iconlunwentimu'
        },
        {
          title: '全球专家细分领域分布',
          content: '全球人工智能专家在各个细分领域的分布报告',
          type: 'expert-industry',
          iconame: 'iconzhuanjiarenzheng'
        },
        {
          title: '全球研究人工智能机构分布',
          content: '全球研究人工智能的机构的分布报告',
          type: 'org',
          iconame: 'iconxiangmu1'
        },
        {
          title: '全球TOP200人工智能专家',
          content: '全球排名前200的人工智能专家详情',
          type: 'expert-rank',
          iconame: 'iconzhuanli'
        }
      ]
    }
  },

  methods: {
    onRedirectClick (id) {
      this.$router.push({
        path: `/report/${id}`
      })
    },

    setClass (name) {
      return ['box-card', name]
    }

  }

}
</script>

<style lang="less" scoped>
  @import '~@/style/variables.less';

 .report-list-wrapper {
  //  .breadcrumb {
  //    padding: 20px 0;
  //  }

   .container {
     padding: 20px 0;
      .box-card{
        width: 48%;
        cursor: pointer;
      }
      .box-card:hover{
        .word p{
          color: rgba(0, 0, 0, 0.8);
        }
      }
      .bg1{
        background: #dff0d8;
      }
      .bg2{
        background: #d9edf7;
      }
      .bg3{
        background: #fcf8e3;
      }
      .bg4{
        background: #f2dede;
      }
      .box-card:nth-child(odd){
        float: left;
      }
      .box-card:nth-child(even){
        float: right;
      }
     .report-wrapper {
       height: 100px;
       .report-item {
         border-bottom: solid 1px #ccc;
         padding-bottom: 15px;
         display: flex;
         justify-content: space-between;
         .more{
           font-size: 12px;
           color:#409EFF;
           cursor: pointer;
         }
         .title{
            font-size: 16px;
            font-weight: 600;
            color: #409EFF;
         }
       }
        .report-item:hover{
           cursor: pointer;
        }
       .content {
         display: flex;
         flex-flow: row nowrap;
         .word {
           flex: 1 1 auto;
           padding-right: 30px;
           padding-top: 15px;
           font-size: 14px;
           color: rgba(0, 0, 0, 0.6);
           line-height: 24px;
         }
       }
    }
  }
 }
</style>
