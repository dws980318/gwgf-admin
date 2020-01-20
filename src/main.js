// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueVideoPlayer from 'vue-video-player'
import api from './utils/api.js'
import store from './store'


Vue.prototype.$api = api; // 将api挂载到vue的原型上

// import Editor from './components/editor/Editor'

// require videojs style
// import 'vue-video-player/src/custom-theme.css'
import './common/css/variable.styl'
import 'video.js/dist/video-js.css'
import './theme/index.css'
import './common/css/reset.css'
import './common/css/common.css'




Vue.use(ElementUI)
// Vue.component({'vue-editor': Editor})
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let login = localStorage.login
  if(to.path === '/login') {
    next()
    return
  }
  if(!login) {
    next('/login')
    return
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>'
})
