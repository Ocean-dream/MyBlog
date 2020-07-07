import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible/index.js'
import axios from 'axios'
import '@vant/touch-emulator'
import moment from 'moment'
import './plugins/vantComponents.js'
import FastClick from 'fastclick'

Vue.prototype.$http = axios
axios.defaults.withCredentials = true
Vue.config.productionTip = false

FastClick.attach(document.body)

function getServerConfig () {
  return new Promise((resolve, reject) => {
    axios.get('./server.json').then((result) => {
      let config = result.data
      for (let key in config) {
        Vue.prototype[key] = config[key]
      }
      resolve()
    }).catch(() => {
    })
  })
}

// 定义一个全局过滤器格式化时间
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

async function init () {
  await getServerConfig()
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}
init()
