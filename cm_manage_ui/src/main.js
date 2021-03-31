import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import App from './App'
import store from './store/index'
import router from './router/routers'
// import 'jquery'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const G2 = require('@antv/g2')

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$G2 = G2

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
