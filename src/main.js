import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import weui from 'weui.js'
import axios from 'axios'
import coderouter from './config'
import qs from 'qs'
import 'weui'
import '@/assets/main.css'
import fixInputBug from '@/plugins/fix-input-bug'
import reValid from '@/plugins/re-valid'
import emptyClass from '@/plugins/empty-class'

Vue.prototype.$weui = weui
Vue.prototype.$axios = axios
Vue.prototype.$coderouter = coderouter

Vue.use(fixInputBug)
Vue.use(reValid)
Vue.use(emptyClass)

Vue.config.productionTip = false
Vue.prototype.$hasInit = false

store.dispatch('update_usertoken', {
  // loginToken:'testtoken',
  openid:'testopenid'
})
axios.interceptors.request.use(function(config){
  store.dispatch('open_loading')
  config.transformRequest = data => qs.stringify(data)
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
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
  if(response.request.responseURL.endsWith('config.json')){
    return response
  }

  if(response.data.code && response.data.code != 0)
  {
    let cr = Vue.prototype.$coderouter[response.data.code]
    let pathname = cr ? cr.router : 'warn'
    let msg = response.data.msg ||  (cr ? cr.msg : '')
    router.push({ name: pathname, params: { code:response.data.code, msg: msg } })
  }
  return response
}, function(error){
  store.dispatch('close_loading')
  router.replace({ name: 'error', 
    params: { 
      code: error.response ? error.response.status : error, 
      statustxt: error.response ? error.response.statusText : '' 
    }
  })
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


