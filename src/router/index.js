import Vue from 'vue'
import Router from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Search from './modules/search'
import Report from './modules/report'
import Detail from './modules/detail'
import Graph from './modules/graph'

NProgress.configure({
  showSpinner: false
})

const Homepage = () => import(/* webpackChunkName: "home" */ '@/views/home/index')
const HelpPage = () => import(/* webpackChunkName: "help" */ '@/views/help/index')
const PolicyPage = () => import(/* webpackChunkName: "policy" */ '@/views/policy/index')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/help',
      name: 'HelpPage',
      component: HelpPage
    },
    {
      path: '/policy',
      name: 'PolicyPage',
      component: PolicyPage
    },
    Search,
    ...Report,
    Detail,
    Graph
  ]
})

router.beforeEach(async (to, from, next) => {
  // 0.0 启动进度条
  NProgress.start()
  next()
})

router.afterEach((to) => {
  // 设置document title
  document.title = to.meta.title || '重点国别人工智能领域人才地图'
  // 结束进度条
  NProgress.done()
})

export default router
