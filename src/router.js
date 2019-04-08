import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import axios from 'axios'

Vue.use(Router)

const VRouter = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      props: true,
      component: () => import('./views/Welcome.vue')
    }, {
      path: '/mock',
      name: 'mock',
      component: () => import('./views/Wemock.vue')
    }, {
      path: '/user/auth',
      name: 'userauth'
    },  {
      path: '/user/reg',
      name: 'userreg',
      component: () => import('./views/user/Reg.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/vehicle/bind',
      name: 'bind',
      component: () => import('./views/vehicle/Bind.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/vehicle/bindlist',
      name: 'bindlist',
      component: () => import('./views/vehicle/BindList.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/qrcode/veno',
      name: 'veno',
      component: () => import('./views/qrcode/VeNo.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/qrcode/weigh',
      name: 'weigh',
      component: () => import('./views/qrcode/Weigh.vue'),
      meta: { requiresLogin: true }
    },{
      path: '/qrcode/weighdetail',
      name: 'weighdetail',
      props: true,
      component: () => import('./views/qrcode/WeighDetail.vue'),
      meta: { requiresLogin: true }
    },{
      path: '/plan/report',
      name: 'planreport',
      component: () => import('./views/plan/Report.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/plan/planlog',
      name: 'planlog',
      component: () => import('./views/plan/PlanLog.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/plan/plandetail/:id',
      name: 'plandetail',
      props: true,
      component: () => import('./views/plan/PlanDetail.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/invoice/einvoice',
      name: 'einvoice',
      component: () => import('./views/invoice/EInvoice.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/admin/menugroup',
      name: 'menugroup',
      component: () => import('./views/admin/MenuGroup.vue'),
      // meta: { requiresLogin: true }
    }, {
      path: '/admin/menu',
      name: 'menu',
      component: () => import('./views/admin/Menu.vue'),
      // meta: { requiresLogin: true }
    }, {
      path: '/warn/:code/:msg',
      name: 'warn',
      props: true,
      component: () => import('./views/notic/Warn.vue')
    }, {
      path: '/error/:code/:statustxt',
      name: 'error',
      props: true,
      component: () => import('./views/notic/Error.vue')
    }, {
      path: '*',
      name: 'errpage',
      component: () => import('./views/notic/Error.vue')
    }
  ]
})

VRouter.beforeEach((to, from, next) => {
  if(to.name != 'welcome'
     && !Vue.prototype.$hasInit){
    next({ name: 'welcome', query: { redirect_url: to.fullPath } })
  } else if (to.query.code 
          && store.state.authSate == to.query.state) {
    axios.post(Vue.prototype.$api.wechat_loginopenid, { code: to.query.code })
      .then((res) => {
        if(res.data.code == 0){
          store.dispatch('update_usertoken', res.data.content)
          next({ path: to.path })
        }else{
          next({ name: 'warn', params: { msg: res.data.msg } })
        }
      })
  }else if (to.name == 'userauth' 
         || to.path == '/user/auth' 
         || to.meta.requiresLogin 
         || to.meta.requiresAuth) {
    if (!store.state.userToken.openid) {
      // 获取appid
      axios.get(Vue.prototype.$api.wechat_appid)
        .then((result) => {
          const appid = result.data.content.appid
          if(appid){
            const ruri = encodeURIComponent(window.location.href)
            window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${ruri}&response_type=code&scope=snsapi_userinfo&state=${store.state.authSate}#wechat_redirect`)
          }else{
            next({ name: 'warn', params: { msg: "无法授权" } })
          }
       });
    } else if (to.meta.requiresLogin 
            && !store.state.userToken.loginToken) {
      next({ path: '/user/reg', query: { redirect_url: to.fullPath } })
    } else { next() }
  } else { next() }
})
export default VRouter