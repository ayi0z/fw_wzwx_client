module.exports = {
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
    },
    unittypes:[
        {
            "value":1,
            "text": "收货单位"
        },
        {
            "value":2,
            "text": "发货单位"
        }
    ]
}

