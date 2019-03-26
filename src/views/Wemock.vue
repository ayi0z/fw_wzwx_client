<template>
    <div>
        <div class="weui-cells__title">微信菜单如果模拟</div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/user/reg')">
                <div class="weui-cell__bd">
                    <p>用户注册</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/vehicle/bind')">
                <div class="weui-cell__bd">
                    <p>绑定车牌号</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/vehicle/bindlist')">
                <div class="weui-cell__bd">
                    <p>车号绑定列表</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/qrcode/veno')">
                <div class="weui-cell__bd">
                    <p>车号二维码</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/qrcode/weigh')">
                <div class="weui-cell__bd">
                    <p>计量委托二维码</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/plan/planlog')">
                <div class="weui-cell__bd">
                    <p>过磅记录查询</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/plan/report')">
                <div class="weui-cell__bd">
                    <p>委托申请</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('/invoice/einvoice')">
                <div class="weui-cell__bd">
                    <p>电子发票</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        gourl(url){
            this.$router.replace(url)
        }
    }
}
</script>

