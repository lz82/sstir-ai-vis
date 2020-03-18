import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 获取当前所有请求的cancel方法


import { Message } from 'element-ui'

import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })


const whiteList = ['/'] // 不需要重定向的白名单
// 全局前置导航守卫
// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  NProgress.start() // 启动进度条
  // 清空
  if (getToken()) { // cookie中存在token的场合
    next()
  } else {
    // cookie中不存在token的场合
    // 在白名单中的则直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 不在白名单的直接跳登录页
      next(`/?login=1`)
      Message.error('请先登录')
      NProgress.done() // hack method 如果当前页就是登录页，那么不会触发afterEach,需要在这里手动触发
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
