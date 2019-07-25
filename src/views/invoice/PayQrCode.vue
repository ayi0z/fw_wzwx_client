<template>
    <div class="page">
        <img v-show="qrurl" class="img-qrcode" :src="qrurl" alt="支付二维码" @click="doReadPayQrCode">
        <div class="text" :class="qrurl ? '' : 'text-top' ">{{text}}</div>
    </div>
</template>
<script>
export default {
    name:'payqrcode',
    data:function(){
        return {
            qrurl:'',
            text:'正在获取支付二维码...'
        }
    },
    created() {
        this.doReadPayQrCode()
    },
    methods:{
        doReadPayQrCode(){
            this.text = '正在刷新支付二维码...'
            this.$axios.post(this.$api.ws_payqrcode, { PayRMB:0 })
                .then(res=>{
                    if(res.data.code == 0){
                        this.qrurl = res.data.content.url
                        this.text = '扫码支付  点击二维码可刷新'
                    }else{
                        this.text = '支付二维码获取失败'
                    }
                })
        }
    }
}
</script>
<style lang="stylus" scoped>
    .page
        text-align center
        img
            margin 5rem auto auto auto
        .text
            color #b5b4b4
            font-size .5rem
        .text-top
            margin-top 15rem
</style>
