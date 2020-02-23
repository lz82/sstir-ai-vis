<template>
  <div class="org-pannel-wrapper">
    <h3>Cooperative Organization</h3>
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrgPannel',

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  methods: {
    goSearch (keyword) {
      this.$router.push(`/search/result/${keyword}`)
    }
  }
}
</script>

<style lang="less" scoped>
  .org-pannel-wrapper {
    padding-top: 30px;
    h3 {
      font-size: 14px;
      font-weight: 500;
    }
    ul {
      padding-top: 25px;
      display: flex;
      flex-flow: row wrap;
      li {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        margin-right: 20px;
         line-height: 24px;
      }
    }
  }
</style>
