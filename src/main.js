import Vue from 'vue'
import App from './app.vue'
import router from './router/index'
import './permission'

import store from './store'

import VCharts from 'v-charts'

// 全局样式、字体
import '@/style/index.less'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入插件
import * as Plugins from './plugins'

Object.keys(Plugins).forEach((key) => {
  Vue.use(Plugins[key])
})

Vue.use(ElementUI)
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
