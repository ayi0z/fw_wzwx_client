<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;"
                    v-for="item in form.Nos" :key="item.Id" @click="doQrCode(item.Id)">
                    <div class="weui-cell__bd">
                        <p>{{item.车号}}</p>
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
                Nos:[]
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
        // vehicle_nos
        this.$axios.get(this.$api.vehicle_nos)
            .then((res)=>{
                if(res.data.code == 0){
                    this.form.Nos = res.data.content
                }
            })
    },
    methods:{
        doQrCode(id){
            this.$axios.post(this.$api.qrcode, {id})
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 0){
                        this.qrcode.showing = true
                        this.qrcode.alt = this.form.Nos.find(c=>c.Id == id).车号
                        this.qrcode.url = `data:image/jpeg;base64,${res.data.content}`
                    }
                })
        }
    }
}
</script>
