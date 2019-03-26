const wechat = require('./mock/wechat.json')
const user = require('./mock/user.json')
const vehicle = require('./mock/vehicle.json')
const ws = require('./mock/ws.json')

module.exports ={
  devServer: {
    port:4000,
    before(app){
      app.post('/api/wechat/loginopenid', (req, res)=>{
        console.log(req)
        res.json(wechat.loginopenid.success)
      })
      app.get('/api/wechat/appid', (req, res)=>{
        res.json(wechat.appid.success)
      })

      app.post('/api/user', (req, res)=>{
        res.json(user.register.success)
      })

      app.post('/api/vehicle/bind', (req, res)=>{
        res.json(vehicle.bind.success)
      })
      app.post('/api/vehicle/unbind', (req, res)=>{
        res.json(vehicle.bind.success)
      })
      app.get('/api/vehicle/bindlist', (req, res)=>{
        res.json(vehicle.bindlist)
      })
      app.get('/api/vehicle/nos', (req, res)=>{
        res.json(vehicle.vehiclenos)
      })
      

      app.get('/api/ws/unittype', (req, res)=>{
        console.log(wechat)
        res.json(ws.unittype)
      })
      app.get('/api/ws/units', (req, res)=>{
        res.json(ws.units)
      })
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://localhost:5001/api',
    //     pathRewrite:{
    //       '^/api':''
    //     }
    //   }
    // }
  }
}