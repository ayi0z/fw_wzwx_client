import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SuccessToast:{
      showing: false,
      secs: 2,
      msg:'已完成'
    },
    Loading:{
      loading: false,
      msg:'正在加载'
    },
    authSate:'wxwx2019',
    userToken:{
      loginToken:undefined,
      openid:undefined
    }
  },
  mutations: {
    success(state, toast){
      let type = typeof(toast)
      if(type == 'boolean'){
        state.SuccessToast.showing = toast
      }else if(type == 'object') {
        state.SuccessToast = Object.assign({}, state.SuccessToast, toast)
      }
      if(state.SuccessToast.showing){
        setTimeout(()=>{ state.SuccessToast.showing = false }, state.SuccessToast.secs * 1000)
      }
    },
    loading(state, toast){
      let type = typeof(toast)
      if(type == 'boolean'){
        state.Loading.loading = toast
      }else if(type == 'object') {
        state.Loading = Object.assign({}, state.Loading, toast)
      }
    },
    userToken(state, utoken){
      state.userToken = Object.assign({}, state.userToken, utoken)
    }
  },
  actions: {
    success({commit}, toast){
      commit('success', toast)
    },
    loading({commit}, toast){
      commit('loading', toast)
    },
    open_loading({commit}){
      commit('loading', true)
    },
    close_loading({commit}){
      commit('loading', false)
    },
    update_usertoken({commit}, utoken){
      commit('userToken', utoken)
    }
  }
})
