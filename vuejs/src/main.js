// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Other from './pages/Other'

Vue.use(VueRouter)
Vue.use(Element)
// 定义路由配置
// '/'和detail 为1级目录 other为detail下的二级目录
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/other',
    component: Home
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/detail/other',
    component: Other
  }
]
// 创建路由实例
const router = new VueRouter({
  routes
})
new Vue({
  el: '#app',
  data () {
    return {
      transitionName: 'slide'
    }
  },
  router,  // 在vue实例配置中用router
  store,  // 引入store用于组件间的通讯
  watch: {
    // 监视路由，参数为要目标路由和当前页面的路由
    '$route' (to, from) {
      const toDepth = to.path.substring(0, to.path.length - 2).split('/').length
      const fromDepth = from.path.substring(0, from.path.length - 2).split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide'
      // 根据路由深度，来判断是该从右侧进入还是该从左侧进入
    }
  }
})
