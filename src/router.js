import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import axios from 'axios'
import { api } from './config'

Vue.use(Router)

const VRouter = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'mock',
      component: () => import('./views/Wemock.vue')
    },
    {
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
    }, {
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
      path: '/warn/:msg',
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
  if (to.query.code && store.state.authSate == to.query.state) {
    axios.post(api.wechat_loginopenid, { code: to.query.code })
      .then((res) => {
        store.dispatch('update_usertoken', res.data.content)
        next({ path: to.path })
      })
      .catch((err) => {
        next({ name: 'warn', params: { msg: err.data.msg } })
      });
  } else if (to.meta.requiresLogin || to.meta.requiresAuth) {
    if (!store.state.userToken.openid) {
      axios.get(api.wechat_appid)
        .then((result) => {
          const appid = result.data.content.appid
          window.location.href = window.location.href + `?code=1234132&state=${store.state.authSate}&appid=${appid}`
          // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_userinfo&state=${this.$store.state.authSate}#wechat_redirect`
        }).catch((err) => {
          console.log(err)
        });
    } else if (to.meta.requiresLogin && !store.state.userToken.loginToken) {
      next({ path: '/user/reg', query: { redirect_url: to.fullPath } })
    } else { next() }

  } else { next() }
})
export default VRouter