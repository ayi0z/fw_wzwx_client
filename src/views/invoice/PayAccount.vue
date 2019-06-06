<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">我的账户信息</div>
            <div class="qrcode">
                <div class="text">{{qrcode.text}}</div>
                <img v-show="qrcode.qrurl" class="img-qrcode" :src="qrcode.qrurl" alt="支付二维码" @click="doReadPayQrCode">
            </div>
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">姓名</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{姓名}}
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">手机号</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{手机号}}
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">类型</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{类型}}
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{单位}}
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">税务号</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{税务号}}
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">支付类型</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{支付类型}}
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">余额</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{余额}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "payaccount",
    data: function() {
        return {
            手机号: "",
            类型: "",
            单位: "",
            姓名: "",
            税务号: "",
            支付类型: "",
            余额: 0,
            qrcode:{
                qrurl:'',
                text:'正在获取支付二维码...'
            }
        }
    },
    created() {
        this.$axios.get(this.$api.ws_payaccount)
            .then(res=>{
                if(res.data.code == 0){
                    this.手机号 = res.data.content.手机号
                    this.类型 = res.data.content.类型
                    this.单位 = res.data.content.单位
                    this.姓名 = res.data.content.姓名
                    this.税务号 = res.data.content.税务号
                    this.支付类型 = res.data.content.支付类型
                    this.余额 = res.data.content.余额
                }
            })
        this.doReadPayQrCode()
    },
    methods:{
        doReadPayQrCode(){
            this.qrcode.text = '正在刷新支付二维码...'
            this.$axios.get(this.$api.ws_payqrcode)
                .then(res=>{
                    if(res.data.code == 0){
                        this.qrcode.qrurl = res.data.content
                        this.qrcode.text = '扫码支付  点击二维码可刷新'
                    }else{
                        this.qrcode.text = '支付二维码获取失败'
                    }
                })
        }
    }
};
</script>
<style lang="stylus" scoped>
    .qrcode
        width 100%
        text-align center
        .text
            color #b5b4b4
            margin-top 1rem
            font-size .5rem
</style>
