import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import axios from 'axios'

Vue.use(Router)

const VRouter = new Router({
  mode:'history',
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
      path: '/vehicle/bindcar',
      name: 'bindcar',
      component: () => import('./views/vehicle/BindCar.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/vehicle/bindcarlist',
      name: 'bindcarlist',
      component: () => import('./views/vehicle/BindCarList.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/vehicle/binddpt',
      name: 'binddpt',
      component: () => import('./views/vehicle/BindDpt.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/vehicle/binddptlist',
      name: 'binddptlist',
      component: () => import('./views/vehicle/BindDptList.vue'),
      meta: { requiresLogin: true }
    },  {
      path: '/vehicle/bindmartiral',
      name: 'bindmartiral',
      component: () => import('./views/vehicle/BindMartiral.vue'),
      meta: { requiresLogin: true }
    },  {
      path: '/vehicle/bindmartirallist',
      name: 'bindmartirallist',
      component: () => import('./views/vehicle/BindMartiralList.vue'),
      meta: { requiresLogin: true }
    },  {
      path: '/qrcode/veno/',
      name: 'veno',
      component: () => import('./views/qrcode/VeNo.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/qrcode/plan',
      name: 'plan',
      component: () => import('./views/qrcode/Plan.vue'),
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
      path: '/plan/planlog/cuscarno',
      name: 'planlogcuscarno',
      props: {isWithCusCarNo:true},
      component: () => import('./views/plan/PlanLog.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/plan/weighlogwithcar',
      name: 'weighlogwithcar',
      component: () => import('./views/plan/WeighLogWithCar.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/plan/weighlogwithdpt',
      name: 'weighlogwithdpt',
      component: () => import('./views/plan/WeighLogWithDpt.vue'),
      meta: { requiresLogin: true }
    }, {
      path: '/plan/task',
      name: 'task',
      component: () => import('./views/plan/Task.vue'),
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
    }, {
      path: '/admin/menu',
      name: 'menu',
      component: () => import('./views/admin/Menu.vue'),
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
  if(to.name != 'welcome' && !Vue.prototype.$hasInit){
    next({ name: 'welcome', query: { redirect_url: to.fullPath }, replace: true })
  } else if (to.query.code && store.state.authSate == to.query.state) {
      axios.post(Vue.prototype.$api.wechat_loginopenid, { code: to.query.code })
            .then((res) => {
              if(res.data.code == 0){
                store.dispatch('update_usertoken', res.data.content)
                next({ path: to.path, replace: true })
              }else{
                next({ name: 'warn', params: { msg: res.data.msg }, replace: true })
              }
            })
  }else if (to.meta.requiresLogin || to.meta.requiresAuth) {
          if (!store.state.userToken.openid) {
              // 获取appid
              axios.get(Vue.prototype.$api.wechat_appid)
                .then((result) => {
                  const appid = result.data.content.appid
                  if(appid){
                    const ruri = encodeURIComponent(`${window.location.origin}${to.fullPath}`)
                    const authuri  = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${ruri}&response_type=code&scope=snsapi_userinfo&state=${store.state.authSate}&connect_redirect=1#wechat_redirect`
                    window.location.replace(authuri)
                  }else{
                    next({ name: 'warn', params: { msg: "无法授权,APPID丢失" } })
                  }
              });
          } else if (to.meta.requiresLogin 
                  && !store.state.userToken.loginToken) {
            next({ path: '/user/reg', query: { redirect_url: to.fullPath }, replace: true })
          } else {
            next({replace: true}) }
          
  } else { next({replace: true}) }
})
export default VRouter