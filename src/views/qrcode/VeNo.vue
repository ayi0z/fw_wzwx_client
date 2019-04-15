<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title"><i class="weui-icon-info-circle"></i>点击车牌号可查看最近两天的计量委托</div>
            <div class="weui-cells">
                <div v-for="cno in form.CarNos" :key="cno">
                    <a class="weui-cell weui-cell_access carno-cell" href="javascript:;">
                        <div class="weui-cell__bd" @click="doLoadPlan(cno)">
                            <p>{{cno}}</p>
                        </div>
                        <div class="weui-cell__ft" @click="doQrCode(cno)">点击这里生成二维码</div>
                    </a>
                    <div v-if="cno == query.CarNo">
                        <a class="weui-cell weui-cell_access" href="javascript:;"
                            v-for="pl in form.plans" :key="pl.过磅申请号" @click="doDetail(pl)">
                            <div class="weui-cell__bd">
                                <p>{{pl.过磅申请时间}}</p>
                            </div>
                            <div class="weui-cell__ft">点击查看详情</div>
                        </a>
                        <load-tip v-if="!form.plans || !form.plans.length"></load-tip>
                    </div>
                </div>
            </div>
            <load-tip :datas="form.CarNos"></load-tip>
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
                CarNos:[],
                plans:[]
            },
            query:{
                querytype:0, 
                CarNo:'',
                BgDT:this.$util.DateFilter(new Date(), -2),
                EdDT:this.$util.DateFilter(new Date()),
                IsAll: true
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
    created(){
        this.$axios.get(this.$api.ws_mycars)
            .then((res)=>{
                if(res.data.code == 0){
                    this.form.CarNos = res.data.content
                }
            })
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
        doLoadPlan(cno){
            this.query.CarNo = cno
            this.form.plans = []
            if(this.query.CarNo){
                this.$axios.get(this.$api.ws_carplan, { params: this.query })
                    .then((res)=>{
                        if(res.data.code == 0){
                            this.form.plans = res.data.content
                        }
                    })
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
</style>
