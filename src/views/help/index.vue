<template>
  <div class="intro-wrapper">
    <user-doc :list="list" :imgW='imgW'></user-doc>
  </div>
</template>
<script>
import UserDoc from '@/components/user-doc'
import list from './data'
export default {
  name: 'IntroPage',
  components:{
    UserDoc
  },
  data(){
    return {
      list: list,
      imgW: '70%'
    }
  }
}
</script>
<style lang='less' scoped>
.intro-wrapper{
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 15px 40px 15px;
}
</style>
