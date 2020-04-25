<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title"><i class="weui-icon-info-circle"></i>点击车牌号可查看最近两天的计量委托</div>
            <div class="weui-cells">
                <div v-for="(value, cno) in form.plans" :key="cno">
                    <a class="weui-cell weui-cell_access carno-cell" href="javascript:;">
                        <div class="weui-cell__bd" @click="value.showing=!value.showing">
                            <p>{{cno}}</p>
                        </div>
                        <div class="weui-cell__ft" @click="doQrCode(cno)">点击这里生成二维码</div>
                    </a>
                    <div v-if="value.showing">
                        <a class="weui-cell weui-cell_access" href="javascript:;"
                            v-for="pl in value.plans" :key="pl.过磅申请号" @click="doDetail(pl)">
                            <div class="weui-cell__bd">
                                <p :class="pl.已过12小时 == '是'?'plan-red':'plan-green'">{{pl.过磅申请时间}}</p>
                            </div>
                            <div class="weui-cell__ft">点击查看详情</div>
                        </a>
                    </div>
                </div>
            </div>
            <load-tip :datas="hasCarNos"></load-tip>
            <qr-dialog v-show="qrcode.showing" :url="qrcode.url" :alt="qrcode.alt" @close="(va) => {qrcode.showing=va}"></qr-dialog>
            <detail-dialog  v-show="detail.showing" :data="detail.data" :before="doDialogDetailBefore"  @close="()=>{detail.showing = false}"></detail-dialog>
        </div>
    </div>
</template>

<script>
import DetailDialog from '@/components/Dialog-Detail'
import QrDialog from '@/components/Dialog-Img'
import ListLoadTip from '@/components/ListLoadTip'
import { tasktype, weightype, plantype } from "@/config";
export default {
    name: 'qrveno',
    components:{
        "load-tip":ListLoadTip,
        'detail-dialog': DetailDialog,
        'qr-dialog': QrDialog
    },
    data(){
        return {
            form:{
                plans:null
            },
            detail:{
                showing:false,
                data:null
            },
            qrcode:{
                showing:false,
                alt:'车号二维码',
                url:''
            }
        }
    },
    computed:{
        hasCarNos:function() {
            return this.form.plans ? true : false
        }
    },
    created(){
        this.$axios.get(this.$api.ws_activeplan)
            .then((res)=>{
                if(res.data.code == 0){
                    const acplans = res.data.content
                    let now = Date.parse(new Date())
                    this.form.plans = acplans.reduce((cur, next)=>{
                        let ctime = Date.parse(new Date(next.创建时间.replace(/-/g, '/')))
                        let diffhours = (now-ctime)/1000/60/60
                        next["已过12小时"] = diffhours > 12 ? '是':'否'
                        if(next.车号 in cur){
                            cur[next.车号]['plans'].push(next)
                        }else{
                            cur[next.车号]= {showing:true}
                            cur[next.车号]['plans'] = [ next ]
                        }
                        return cur
                    }, {})
                }
            })
        
        // let now = Date.parse(new Date())
        // let acplans = [{"过磅申请号":"61201904030742","处理标识":false,"委托类型":"1","过磅类型":"4","任务类型":"C","过磅申请时间":"20190426104912","二维码卡号":"","品名":"测试40138","品名代码":"GCLTCC","发货单位":"炼铁高炉高炉作业区","装点":"炼铁高炉高炉作业区","装点代码":"LT00","收货单位":"金资公司冶金渣分厂鑫鸿诚","卸点":"金资公司冶金渣分厂鑫鸿诚","卸点代码":"JZ00","车号":"测试40138","托运号":"D2X0001","物流任务号":"1zC903280022        ","生效时间":"20190403104915","失效时间":"20190404104915","标准皮重":0.0,"电文号":"NL4N01","批号":"","填报人":null,"创建时间":"2019-04-26 10:49:42","长期有效":false,"缴费单位":null,"缴款类型":null},{"过磅申请号":"65201904110071","处理标识":false,"委托类型":"1","过磅类型":"3","任务类型":"G","过磅申请时间":"20190414231453","二维码卡号":"","品名":"低硫压块","品名代码":"LWGYL","发货单位":"二炼钢厂","装点":"废钢分厂7#料场A01","装点代码":"FG00","收货单位":"二炼钢厂","卸点":"炼钢三炼钢","卸点代码":"LG00","车号":"鄂AB2R21","托运号":"B2Z0154","物流任务号":"CG190410031         ","生效时间":"20190410231453","失效时间":"20190411231453","标准皮重":0.0,"电文号":"NL4N01","批号":"","填报人":null,"创建时间":"2019-04-14 23:15:10","长期有效":false,"缴费单位":null,"缴款类型":null},{"过磅申请号":"65201904110073","处理标识":false,"委托类型":"1","过磅类型":"4","任务类型":"G","过磅申请时间":"20190414231454","二维码卡号":"","品名":"低硫压块","品名代码":"LWGYL","发货单位":"二炼钢厂","装点":"废钢分厂7#料场A01","装点代码":"FG00","收货单位":"二炼钢厂","卸点":"炼钢三炼钢","卸点代码":"LG00","车号":"鄂AB2R21","托运号":"B2Z0154","物流任务号":"CG190410031         ","生效时间":"20190410231453","失效时间":"20190411231453","标准皮重":0.0,"电文号":"NL4N01","批号":"","填报人":null,"创建时间":"2019-04-14 23:15:10","长期有效":false,"缴费单位":null,"缴款类型":null},{"过磅申请号":"65201904110078","处理标识":false,"委托类型":"1","过磅类型":"1","任务类型":"G","过磅申请时间":"20190414231455","二维码卡号":"","品名":"低硫压块","品名代码":"LWGYL","发货单位":"二炼钢厂","装点":"废钢分厂7#料场A01","装点代码":"FG00","收货单位":"二炼钢厂","卸点":"炼钢三炼钢","卸点代码":"LG00","车号":"鄂AB2R21","托运号":"B2Z0154","物流任务号":"CG190410031         ","生效时间":"20190410231453","失效时间":"20190411231453","标准皮重":0.0,"电文号":"NL4N01","批号":"","填报人":null,"创建时间":"2019-04-14 23:15:10","长期有效":false,"缴费单位":null,"缴款类型":null}]
        // this.form.plans = acplans.reduce((cur, next)=>{
        //                 let ctime = Date.parse(new Date(next.创建时间.replace(/-/g, '/')))
        //                 let diffhours = (now-ctime)/1000/60/60
        //                 next["已过12小时"] = diffhours > 12 ? '是':'否'
        //                 if(next.车号 in cur){
        //                     cur[next.车号]['plans'].push(next)
        //                 }else{
        //                     cur[next.车号]= {showing:true}
        //                     cur[next.车号]['plans'] = [ next ]
        //                 }
        //                 return cur
        //             }, {})
    },
    methods:{
        doDialogDetailBefore(data){
            if(data){
                data.任务类型 = tasktype[data.任务类型] || data.任务类型
                data.过磅类型 = weightype[`C${data.过磅类型}`] || data.过磅类型
                data.委托类型 = plantype[`C${data.委托类型}`] || data.委托类型
                data.处理标识 = data.处理标识 ? "已处理" : "未处理"
                data.长期有效 = data.长期有效 ? "是" : "否"
            }
        },
        doDetail(pl){
            this.detail.data = pl
            this.detail.showing = true
        },
        doQrCode(cno){
            this.$axios.post(this.$api.ws_qrcode, {enstr:cno})
                .then(res=>{
                    if(res.data.code == 0){
                        this.qrcode.showing = true
                        this.qrcode.alt = cno
                        this.qrcode.url = `data:image/jpeg;base64,${res.data.content}`
                    }
                })

            // this.qrcode.showing = true
            // this.qrcode.alt = cno
            // this.qrcode.url = `data:image/jpeg;base64,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`
        }
    }
}
</script>
<style lang="stylus" scoped>
    .carno-cell
        background-color: #e4e4e4;
        box-shadow: 0px 0px 12px 0px #2c3235
    .weui-cell__ft
        font-size 14px
    .weui-cell:before
        border-top none
    .weui-cells 
        margin-top 0
    .weui-icon-info-circle
        font-size 16px
        vertical-align sub
    .weui-cells__title
        font-size 12px
    .plan-red
        color:#e22300
    .plan-green
        color #05a205
</style>
