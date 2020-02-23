<template>
  <div class="report-breadcrumb-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report/list' }"><i class="el-icon-pie-chart" />&nbsp;可视化报告</el-breadcrumb-item>
      <el-breadcrumb-item v-if="type" style='color:#fff;'>{{type}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'ReportBreadcrumb',

  props: {
    type: {
      type: String
    }
  },

  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.report-breadcrumb-wrapper {
  color: #fff;
  padding: 20px 0;

  /deep/ .el-breadcrumb__inner {
    color: #fff !important;
  }
}
</style>
