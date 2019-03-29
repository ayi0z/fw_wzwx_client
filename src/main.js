import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import weui from 'weui.js'
import axios from 'axios'
import qs from 'qs'
import 'weui'
import '@/assets/main.css'
import { api, coderouter, menu_targets } from '@/config'
import fixInputBug from '@/plugins/fix-input-bug'
import reValid from '@/plugins/re-valid'
import emptyClass from '@/plugins/empty-class'

Vue.prototype.$weui = weui
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$coderouter = coderouter
Vue.prototype.$menu_targets = menu_targets

Vue.use(fixInputBug)
Vue.use(reValid)
Vue.use(emptyClass)

Vue.config.productionTip = false

// axios.defaults.baseURL = "https://localhost:5001"

axios.interceptors.request.use(function(config){
  store.dispatch('open_loading')
  config.params = qs.stringify(config.params)

  if (store.state.userToken.loginToken) {
    config.headers.Authorization = store.state.userToken.loginToken;
  }
  if (store.state.userToken.openid) {
    config.headers.openid = store.state.userToken.openid;
  }
  return config
}, function(error){
  store.dispatch('close_loading')
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
  store.dispatch('close_loading')
  if(response.data.code != 0)
  {
    let cr = coderouter[response.data.code]
    let pathname = cr ? cr.router : 'warn'
    let msg = cr ? cr.msg : response.data.msg
    router.push({ name: pathname, params: { code:response.data.code, msg: msg } })
  }
  return response
}, function(error){
  store.dispatch('close_loading')
  router.replace({ name: 'error', params: { code: error.response.status, statustxt: error.response.statusText }})
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
