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
    }
}