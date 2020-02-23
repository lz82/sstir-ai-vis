<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><span style="cursor:pointer;" @click="goBack">Search Result</span></el-breadcrumb-item>
      <el-breadcrumb-item>{{type}} Details</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',

  props: {
    type: {
      type: String
    }
  },

  data () {
    return {
      searchKey: this.$route.query.keyword
    }
  },

  methods: {
    goBack () {
      if (this.searchKey) {
        this.$router.push(`/search/result/${this.searchKey}`)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb-wrapper {}
</style>
