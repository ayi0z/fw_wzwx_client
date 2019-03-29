<template>
    <div class="page">
            <div class="page__bd">
                <div class="weui-cells" v-for="da in datas" :key="da.id">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">过磅品名</label></div>
                        <div class="weui-cell__bd">
                          {{da.品名}}    
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">发货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                            {{da.发货单位}}
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">收货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                            {{da.收货单位}}
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">车牌号</label>
                        </div>
                        <div class="weui-cell__bd">
                           {{da.车牌号}}
                        </div>
                    </div>
                    <div class="weui-panel__ft">
                        <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link"
                            @click="doQrCode(da)">
                            <div class="weui-cell__bd">生成二维码</div>
                            <span class="weui-cell__ft"></span>
                        </a>
                    </div>
                </div>
                <qr-dialog v-show="qrcode.showing" :url="qrcode.url" :alt="qrcode.alt" @close="(va) => {qrcode.showing=va}"></qr-dialog>
            </div>
        </div>
</template>

<script>
import QrDialog from '@/components/Dialog-Img'
export default {
    name:'qrweigh',
    data(){
        return {
            qrcode:{
                showing:false,
                url:'',
                alt:''
            },
            datas:[
                {
                    id:111,
                    品名:'物资A',
                    发货单位:'发单B',
                    收货单位:'收单A',
                    车牌号:'京A8888'
                }
            ]
        }
    },
    components:{
        'qr-dialog': QrDialog
    },
    methods: {
        doQrCode(da){
            this.$axios.post(this.$api.qrcode, {...da})
                .then(res=>{
                    if(res.data.code == 0){
                        this.qrcode.showing = true
                        this.qrcode.alt = da.品名
                        this.qrcode.url = `data:image/jpeg;base64,${res.data.content}`
                    }
                })
        }
    }
}
</script>

