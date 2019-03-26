<template>
    <div class="page">
            <div class="page__bd">
                <div class="weui-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">过磅品名</label></div>
                        <div class="weui-cell__bd">
                          物资A    
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">发货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                            发单方
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">收货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                            收单方
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">车牌号</label>
                        </div>
                        <div class="weui-cell__bd">
                           京A66666
                        </div>
                    </div>
                    <div class="weui-panel__ft">
                        <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link"
                            @click="doQrCode">
                            <div class="weui-cell__bd">生成二维码</div>
                            <span class="weui-cell__ft"></span>
                        </a>
                    </div>
                </div>
                <div class="weui-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">过磅品名</label></div>
                        <div class="weui-cell__bd">
                          物资A    
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">发货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                            发单方
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">收货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                            收单方
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">车牌号</label>
                        </div>
                        <div class="weui-cell__bd">
                           京A66666
                        </div>
                    </div>
                    <div class="weui-panel__ft">
                        <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link" @click="doQrCode">
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
            }
        }
    },
    components:{
        'qr-dialog': QrDialog
    },
    methods: {
        doQrCode(){
            this.qrcode.showing = true
            this.qrcode.url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553585154237&di=79f59d8aed335931c7332bdd9d6dd4ad&imgtype=0&src=http%3A%2F%2Fimg.jiaodong.net%2Fpic%2F003%2F004%2F130%2F00300413046_2e324920.gif'
            this.qrcode.alt = '计量委托二维码'
        }
    }
}
</script>

