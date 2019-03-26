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
            <div class="js_dialog" v-show="qrcode.showing">
                <div class="weui-mask"></div>
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{qrcode.alt}}</strong></div>
                    <div class="weui-dialog__bd">
                        <img class="img-qrcode" :src="qrcode.url" :alt="qrcode.alt">
                    </div>
                    <div class="weui-dialog__ft">
                        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="qrcode.showing = false">关闭</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    created(){
        // vehicle_nos
        this.$axios.get(this.$api.vehicle_nos)
            .then((res)=>{
                console.log(res)
                if(res.data.code == 0){
                    this.form.Nos = res.data.content
                }
            })
    },
    methods:{
        doQrCode(id){
            console.log(id)
            this.qrcode.showing = true
            this.qrcode.alt = this.form.Nos.find(c=>c.Id == id).车号
            this.qrcode.url = `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553585154237&di=79f59d8aed335931c7332bdd9d6dd4ad&imgtype=0&src=http%3A%2F%2Fimg.jiaodong.net%2Fpic%2F003%2F004%2F130%2F00300413046_2e324920.gif`
        }
    }
}
</script>
