import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import weui from 'weui.js'
import axios from 'axios'
import qs from 'qs'
import 'weui'
import '@/assets/main.css'
import fixInputBug from '@/plugins/fix-input-bug'
import reValid from '@/plugins/re-valid'
import emptyClass from '@/plugins/empty-class'
import util from './util'

Vue.prototype.$util = util
Vue.prototype.$weui = weui
Vue.prototype.$axios = axios

Vue.use(fixInputBug)
Vue.use(reValid)
Vue.use(emptyClass)

Vue.config.productionTip = false
Vue.prototype.$hasInit = false

// store.dispatch('update_usertoken', {
//   // openid:'oTAOO5pehW2x3PpuJQ3UeSMlKWhw',
//   openid:'o_dS85jn5sUt8gCM83d1kjntOZo0',
//   loginToken:'CfDJ8D6ku0UnyBdEvk8KQMzPVqtqQmkCtkqJbN9McY6o6xuSNLcGC_hQ6dwC2_Y5nE3gUdWMCrBBTDQwsBqdxnFQNUB4G_qi1vGPw-EVtbFPeD8D0Bmko6q0cJCzMvfv1j7FU8KB-DKKfYwaO6np7DC83mfbq5piQwaCEwERl5sztAa807qyavzEv9uGll_0iHZfOz2ygNZPIBnLioUmD8nkr5SYqZQpYoa6p6GrBdZYwKg-lrQAKX98nkRAZrVCzbABIgOczA3qXVlv1-4GDOjVZawlUPZR0iVDAnLCo_1eV0hO'
// })
  axios.interceptors.request.use(function(config){
  store.dispatch('open_loading')
  config.transformRequest = data => qs.stringify(data)
  config.headers = {
    ...config.headers,
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
    let msg = response.data.msg ||  ''
    weui.topTips(msg)
    if(response.data.code == -40101){
      store.dispatch('clear_usertoken')
      location.replace(location.href)
    }
    if(response.data.code == -40104){
      store.dispatch('clear_usertoken')
      location.replace(location.href)
    }
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


