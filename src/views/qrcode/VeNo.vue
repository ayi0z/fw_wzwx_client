<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;"
                    v-for="cno in form.CarNos" :key="cno" @click="doQrCode(cno)">
                    <div class="weui-cell__bd">
                        <p>{{cno}}</p>
                    </div>
                    <div class="weui-cell__ft">点击生成二维码</div>
                </a>
            </div>
            <qr-dialog v-show="qrcode.showing" :url="qrcode.url" :alt="qrcode.alt" @close="(va) => {qrcode.showing=va}"></qr-dialog>
        </div>
    </div>
</template>

<script>
import QrDialog from '@/components/Dialog-Img'
export default {
    name: 'qrveno',
    data(){
        return {
            form:{
                CarNos:[]
            },
            qrcode:{
                showing:false,
                alt:'车号二维码',
                url:''
            }
        }
    },
    components:{
        'qr-dialog': QrDialog
    },
    created(){
        this.$axios.get(this.$api.ws_cars)
            .then((res)=>{
                if(res.data.code == 0){
                    this.form.CarNos = res.data.content
                }
            })
    },
    methods:{
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
