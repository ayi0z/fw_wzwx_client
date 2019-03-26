import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import weui from 'weui.js'
import axios from 'axios'
import qs from 'qs'
import 'weui'
import '@/assets/main.css'
import { api } from '@/config'
import fixInputBug from '@/plugins/fix-input-bug'
import reValid from '@/plugins/re-valid'
import emptyClass from '@/plugins/empty-class'

Vue.prototype.$weui = weui
Vue.prototype.$axios = axios
Vue.prototype.$api = api

Vue.use(fixInputBug)
Vue.use(reValid)
Vue.use(emptyClass)

Vue.config.productionTip = false

// axios.defaults.baseURL = "https://localhost:5001"

axios.interceptors.request.use(function(config){
  store.dispatch('open_loading')
  config.params = qs.stringify(config.params)
  return config
}, function(error){
  store.dispatch('close_loading')
  console.log('req inter err: ', error)
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
  if(response.status == 200){
    if(response.data.code == 0)
    {
      store.dispatch('close_loading')
    } else{
      store.dispatch('close_loading')
      router.push({ name: 'warn', params: { msg: response.data.msg } })
    }
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
