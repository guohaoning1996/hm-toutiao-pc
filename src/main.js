import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
import tools from '@/components/index.js'
import '@/style/index.less'

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(tools)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
