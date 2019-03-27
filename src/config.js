module.exports = {
    api:{
        wechat_appid: '/api/wechat/appid',
        wechat_loginopenid: '/api/wechat/loginopenid',

        user_reg: '/api/user',

        // 绑定车牌/单位/司机
        vehicle_bind:'/api/vehicle/bind',
        // 解绑车牌与单位关系
        vehicle_unbind:'/api/vehicle/unbind',
        // 司机绑定车牌与单位关系
        vehicle_bindlist:'/api/vehicle/bindlist',
        // 司机绑定的车牌号
        vehicle_nos:'/api/vehicle/nos',
        
        ws_unittype:'/api/ws/unittype',
        ws_unit:'/api/ws/units'
    },
    coderouter:{
        "-40101": {
            router: 'warn',
            msg: '拒绝访问'
        },
        "-40102": {
            router: 'warn',
            msg: '未关注公众号，拒绝登陆'
        },
        "-40103": {
            router: 'userreg',
            msg: '无访问权限，用户未注册'
        },
        "-40104": {
            router: 'userauth',
            msg: '无访问权限，登陆票据无效'
        },
        "-40105": {
            router: 'warn',
            msg: '注册用户名或密码错误'
        },
        "-40106": {
            router: 'warn',
            msg: '无法为用户设置标签，连接微信服务器错误'
        }
    }
}