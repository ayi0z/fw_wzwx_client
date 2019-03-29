module.exports = {
    api:{
        wechat_appid: '/api/wechat/appid',
        wechat_loginopenid: '/api/wechat/loginopenid',
        wechat_tags: '/api/wechat/tags',
        wechat_menu: '/api/wechat/menu',

        user: '/api/user',
        qrcode: '/api/qrcode',

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
    menu_targets:{
        用户注册: '/user/reg',
        车号绑定: '/vehicle/bind',
        绑定列表: '/vehicle/bindlist',
        车号二维码: '/qrcode/veno',
        计量委托二维码: '/qrcode/weigh',
        过磅记录: '/plan/planlog',
        委托填报: '/plan/planreport',
        电子发票: '/invoice/einvoice',
        菜单管理: '/admin/menugroup'
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
        "-50101": {
            router: 'warn',
            msg: '连接微信服务器错误'
        }
    }
}

