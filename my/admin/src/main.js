import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import moment from 'moment'
import VCharts from 'v-charts'
import vueJsonp from 'vue-jsonp'
import VueAMap from 'vue-amap'
import 'v-charts/lib/style.css'
import VueDraggableResizable from 'vue-draggable-resizable'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.use(vueJsonp)
// import './mock/'

// axios.defaults.baseURL = ''

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'dd3049a34ae10174b71d77a79ac1e248',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

Vue.prototype.$http = axios
axios.defaults.withCredentials = true
Vue.config.productionTip = false
// 预设计如果获取不到cookie，说明登录失效  跳转到首页
// axios.interceptors.request.use(config => {
//   console.log(config)
//   return config
// })
Vue.use(ElementUI)

Vue.use(VCharts)

Vue.config.productionTip = false

// 定义一个全局过滤器格式化时间
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

window.wm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
