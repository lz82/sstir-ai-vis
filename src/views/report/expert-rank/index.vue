<template>
  <div class="report-expert-domain-wrapper">
    <div class="breadcrumb">
      <report-breadcrumb type="全球TOP200人工智能专家" />
    </div>

    <div class="container">
      <el-card style="margin-bottom: 20px;">
        <h3 class="chart-title">全球人工智能专家排行</h3>
        <div class="chart-wrapper">
          <el-table :data="rankData" max-height="800" :show-header="false">
            <el-table-column width="80px" header-align="center" align="center">
              <template slot-scope="scope">
                <span :class="'rank' + ' ' + getRank(scope.$index)">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px">
              <template slot-scope="scope">
                <img class="avatar" :src="scope.row.AVATAR" />
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="info-wrapper">
                  <div class="name">
                    {{ scope.row.NAME }}
                  </div>
                  <div class="value-wrapper">
                    <el-tooltip class="item" effect="light" content="G指标" placement="top-start">
                      <div class="score">
                        <div class="l l-b">G</div>
                        <div class="r r-b">{{ scope.row.G_INDEX }}</div>
                      </div>
                    </el-tooltip>

                    <el-tooltip class="item" effect="light" content="H指标" placement="top-start">
                      <div class="score">
                        <div class="l l-g">H</div>
                        <div class="r r-g">{{ scope.row.H_INDEX }}</div>
                      </div>
                    </el-tooltip>

                    <el-tooltip class="item" effect="light" content="引文量" placement="top-start">
                      <div class="score">
                        <div class="l l-y">C</div>
                        <div class="r r-y">{{ scope.row.NUM_CIATION - 0 }}</div>
                      </div>
                    </el-tooltip>

                    <el-tooltip
                      class="item"
                      effect="light"
                      content="发表论文量"
                      placement="top-start"
                    >
                      <div class="score">
                        <div class="l l-p">P</div>
                        <div class="r r-p">{{ scope.row.NUM_PUBS - 0 }}</div>
                      </div>
                    </el-tooltip>
                  </div>
                  <div class="title">
                    <i class="iconfont icon-suoshuzhiwei" /> &nbsp;{{ scope.row.POS }}
                  </div>
                  <div class="org">
                    <i class="iconfont icon-jigou" /> &nbsp;{{ scope.row.AFF_EN }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="80px">
              <template slot-scope="scope">
                <el-button
                  circle
                  size="mini"
                  type="info"
                  icon="el-icon-search"
                  @click="onPreviewClick(scope.row.SID)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <div class="space-10" />
    </div>
  </div>
</template>

<script>
import rankData from './data/rank-data'

export default {
  name: 'ReportExpertRank',

  data() {
    return {
      rankData,
      showDetail: false,
      currentExpert: {}
    }
  },

  mounted() {},

  methods: {
    getRank(index) {
      switch (index) {
        default:
          return ''
        case 0:
          return 'no-1'
        case 1:
          return 'no-2'
        case 2:
          return 'no-3'
      }
    },

    onPreviewClick(id) {
      this.$router.push(`/report/expert/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.report-expert-domain-wrapper {
  .container {
    .header-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      a {
        color: #66b1ff;
      }
    }
    .chart-title {
      margin: 10px 0 20px 0;
      font-size: 16px;
      font-weight: 600;
      position: relative;
      padding-left: 10px;

      &:before {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        // top: 9px;
        width: 4px;
        height: 20px;
        background: #66b1ff;
      }
    }

    .chart-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
    }

    .rank {
      display: inline-block;
      background: #c3c3c3;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 28px;
    }

    .no-1 {
      background: #fb6846;
    }

    .no-2 {
      background: #fb9b46;
    }

    .no-3 {
      background: #fbd746;
    }

    .avatar {
      width: 90px;
      height: 103px;
      object-fit: cover;
    }

    .info-wrapper {
      display: flex;
      flex-flow: column nowrap;

      .name {
        color: #101010;
        font-size: 20px;
        font-weight: 700;
        padding-bottom: 10px;
      }

      .value-wrapper {
        display: flex;
        flex-flow: row nowrap;

        .score {
          display: flex;
          flex-flow: row nowrap;
          font-size: 13px;
          color: #333;
          .l {
            width: 20px;
            font-weight: 700;
            border: solid 1px #555;
            border-radius: 2px 0 0 2px;
            color: #fff;
            text-shadow: 1px 1px 1px #000;
            padding: 0 4px;
          }

          .r {
            min-width: 40px;
            border: solid 1px #555;
            border-radius: 0 2px 2px 0;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
            margin-right: 8px;
            color: #1e1e1e;
            text-align: center;
            padding: 0 3px;
            box-sizing: border-box;
          }

          .l-g {
            background-color: #bcc8ae;
            border-color: #bcc8ae;
          }
          .r-g {
            border-color: #bcc8ae;
          }

          .l-y {
            background-color: #c7bda1;
            border-color: #c7bda1;
          }
          .r-y {
            border-color: #c7bda1;
          }

          .l-b {
            background-color: #98bec7;
            border-color: #98bec7;
          }
          .r-b {
            border-color: #98bec7;
          }

          .l-p {
            background-color: #adbbdc;
            border-color: #adbbdc;
          }
          .r-p {
            border-color: #adbbdc;
          }
        }
      }

      .title {
        padding-top: 5px;
      }
    }

    .space-10 {
      height: 10px;
    }

    .detail-wrapper {
      display: flex;
      flex-flow: column nowrap;

      .info-wrapper {
        display: flex;
        flex-flow: row nowrap;

        .left-wrapper {
          flex: 0 0 50%;
          display: flex;
          flex-flow: column nowrap;

          .org-wrapper {
            display: flex;
            flex-flow: column nowrap;
            .org-name-en {
              color: #aaa;
            }
          }
        }

        .right-wrapper {
          flex: 0 0 50%;
        }
      }
    }
  }
}
</style>
