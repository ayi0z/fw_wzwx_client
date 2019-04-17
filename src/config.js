module.exports = {
    menu_targets:{
        "用户注册": "/user/reg",
        "绑定-车号单位": "/vehicle/bind",
        "列表-车号单位": "/vehicle/bindlist",
        "绑定-单位": "/vehicle/binddpt",
        "列表-单位": "/vehicle/binddptlist",
        "绑定-车号": "/vehicle/bindcar",
        "列表-车号": "/vehicle/bindcarlist",
        "绑定-品名": "/vehicle/bindmartiral",
        "列表-品名": "/vehicle/bindmartirallist",
        "二维码-车牌号": "/qrcode/veno",
        "二维码-固定委托": "/qrcode/plan",
        "过磅记录(车号)": "/plan/weighlogwithcar",
        "过磅记录(单位)": "/plan/weighlogwithdpt",
        "计量委托填报": "/plan/report",
        "计量委托查询": "/plan/planlog",
        "计量委托查询（计量管理员）": "/plan/planlog/cuscarno",
        "申请审核": "/plan/task",
        "电子发票": "/invoice/einvoice",
        "菜单管理": "/admin/menugroup"
    },
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
            label:'班皮(12小时)'
        },{
            value:3,
            label:'天皮(24小时)'
        },{
            value:4,
            label:'周皮(168小时)'
        },{
            value:5,
            label:'当天皮'
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
        "C":"一车一皮",
        "C0":"一车一皮",
        "C1":"一车一皮",
        "C2":"班皮(12小时)",
        "C3":"天皮(24小时)",
        "C4":"周皮(168小时)",
        "C5":"当天皮"
    },
    plantype:{
        "C0":"固定委托",
        "C1":"一车一委托"
    }
}

