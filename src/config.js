module.exports = {
    // coderouter:{
    //     "-40101": {
    //         router: 'warn',
    //         msg: '拒绝访问'
    //     },
    //     "-40102": {
    //         router: 'warn',
    //         msg: '未关注公众号，拒绝登陆'
    //     },
    //     "-40103": {
    //         router: 'userreg',
    //         msg: '无访问权限，用户未注册'
    //     },
    //     "-40104": {
    //         router: 'userauth',
    //         msg: '无访问权限，登陆票据无效'
    //     },
    //     "-40105": {
    //         router: 'warn',
    //         msg: '注册用户名或密码错误'
    //     },
    //     "-50101": {
    //         router: 'warn',
    //         msg: '连接微信服务器错误'
    //     }
    // },
    unittypes:[
        {
            value:1,
            text: "收货单位"
        },
        {
            value:2,
            text: "发货单位"
        }
    ],
    weighruls:[
        {
            value:1,
            label:'一车一皮'
        },{
            value:2,
            label:'日皮'
        },{
            value:3,
            label:'班皮'
        },{
            value:4,
            label:'周皮'
        }
    ],
    tasktype:{
        "A":"进场",
        "B":"厂内",
        "C":"出厂",
        "D":"倒垛",
        "F":"返查",
        "G":"供应",
        "H":"回收",
        "K":"退库",
        "L":"领料",
        "T":"退货",
        "Y":"倒运",
        "Z":"转驳"
    },
    weightype:{
        "C":"",
        "C1":"一车一皮",
        "C2":"12小时皮",
        "C3":"24小时皮",
        "C4":"7天皮",
        "C5":"当日皮"
    },
    plantype:{
        "C0":"固定委托",
        "C1":"一车一委托"
    }
}

