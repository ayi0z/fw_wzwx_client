<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">我绑定的车牌号：</div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" v-for="(da,index) in datas" :key="index" :for="'ch'+index">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :value="da" v-model="checkedlist" :id="'ch'+index"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{da}}</p>
                    </div>
                    <div class="weui-cell__ft" @click.stop.prevent="doQrCode(da)">生成二维码</div>
                </label> 
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_warn" href="javascript:" @click="doUnbind">立即解绑</a>
            </div>
            <qr-dialog v-show="qrcode.showing" :url="qrcode.url" :alt="qrcode.alt" @close="(va) => {qrcode.showing=va}"></qr-dialog>
        </div>
    </div>
</template>

<script>
import QrDialog from '@/components/Dialog-Img'
export default {
    name: "BindCarListSlot",
    components:{
        'qr-dialog': QrDialog
    },
    data: function(){
        return {
            datas:[],
            checkedlist:[],
            qrcode:{
                showing:false,
                alt:'车号二维码',
                url:''
            }
        }
    },
    mounted(){
        this.doLoadCars()
    },
    methods:{
        doLoadCars(){
            this.$axios.get(this.$api.ws_mycars)
                .then((res) => {
                    if(res.data.code == 0){
                        this.datas = res.data.content
                    }
                })
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
        },
        doUnbind(){
            if(!this.checkedlist || this.checkedlist.length==0){
              this.$weui.topTips('请选择要解绑的车牌号')
              return
            }
            this.$axios.delete(this.$api.ws_mycars, { 
                data:{ carno: this.checkedlist }
             }).then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.checkedlist = []
                        this.doLoadCars()
                    }
                })
        }
    }
};
</script>
