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
    },
    carplan_detail:null,
    weigh_detail:null,
    planlog_datas:[],
    mycarnos:[],
    myweighs:[],
    mydpts:[],
    debugs:[],
    wctags:[]
  },
  mutations: {
    debugs(state, datas){
      state.debugs.push(datas)
    },
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
    },
    carplan_detail(state, plan){
      state.carplan_detail = plan
    },
    weigh_detail(state, plan){
      state.weigh_detail = plan
    },
    mycarnos(state, cars){
      state.mycarnos = cars
    },
    myweighs(state, datas){
      state.myweighs = datas
    },
    mydpts(state, datas){
      state.mydpts = datas
    },
    planlog_datas(state, datas){
      state.planlog_datas = datas
    },
    wctags(state, datas){
      state.wctags = datas
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
    },
    clear_usertoken({commit}){
      commit('userToken', { openid:null, loginToken:null })
    },
    carplan_detail({commit}, plan){
      commit('carplan_detail', plan)
    },
    weigh_detail({commit}, plan){
      commit('weigh_detail', plan)
    },
    mycarnos({commit}, cars){
      commit('mycarnos', cars)
    },
    myweighs({commit}, datas){
      commit('myweighs', datas)
    },
    mydpts({commit}, datas){
      commit('mydpts', datas)
    },
    planlog_datas({commit}, datas){
      commit('planlog_datas', datas)
    },
    wctags({commit}, datas){
      commit('wctags', datas)
    }
  }
})
