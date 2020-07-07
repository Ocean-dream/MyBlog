import Vue from 'vue'
import './plugins/element.js'
import router from './router'
import App from './App.vue'
import 'normalize.css'
import 'default-passive-events'

import axios from 'axios'
// Vue.component('tree-table', TreeTable)
Vue.prototype.$http = axios;
axios.defaults.withCredentials = true // 携带cookie
Vue.config.productionTip = false
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
    //定义一个全局过滤器   格式化时间
Vue.filter('dataFormart', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})
async function init () {
    await getServerConfig()
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
}
init()